"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  abandonInterview,
  addInterviewFreeze,
  maybeInterviewFollowUp,
  saveInterviewAudio,
  saveInterviewProgress,
  startInterview,
} from "@/app/actions/interview";
import { AudioLevelBars } from "@/components/AudioLevelBars";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { FormError } from "@/components/FormError";
import { pushToast } from "@/components/ToastHost";
import { feedbackHref } from "@/lib/feedback";
import {
  INTERVIEW_GRACE_SEC,
  interviewHardEndMs,
  interviewPrimaryEndMs,
  isFollowUpQuestion,
  type InterviewModuleId,
  type InterviewQuestion,
} from "@/lib/interview/banks";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SpeechRec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event?: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type ClockPhase = "idle" | "running" | "grace" | "transition" | "done";
type DialogKind = "start" | "stop" | "restart" | null;

function getSpeechRecognition(): (new () => SpeechRec) | null {
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRec;
    webkitSpeechRecognition?: new () => SpeechRec;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function speak(text: string, onDone?: () => void) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  const voices = window.speechSynthesis.getVoices();
  const en =
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));
  if (en) utterance.voice = en;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    onDone?.();
  };
  utterance.onend = finish;
  utterance.onerror = finish;
  window.speechSynthesis.speak(utterance);
}

function formatTime(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type ResumeSession = {
  id: string;
  startedAt: string;
  durationSec: number;
  frozenMs?: number;
  questions: InterviewQuestion[];
  answers: Array<{ questionId: string; transcript: string }>;
};

function answersMap(session: ResumeSession | null): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of session?.answers ?? []) {
    map[item.questionId] = item.transcript;
  }
  return map;
}

function resumeIndex(session: ResumeSession | null): number {
  if (!session) return 0;
  const answered = new Set(session.answers.map((item) => item.questionId));
  const next = session.questions.findIndex((item) => !answered.has(item.id));
  if (next === -1) return Math.max(0, session.questions.length - 1);
  return next;
}

export function InterviewRunner({
  dict,
  module,
  hasApiKey,
  error,
  initialSession,
}: {
  dict: Dictionary;
  module: InterviewModuleId;
  hasApiKey: boolean;
  error?: string;
  initialSession: ResumeSession | null;
}) {
  const [sessionId, setSessionId] = useState<string | null>(
    initialSession?.id ?? null,
  );
  const [questions, setQuestions] = useState<InterviewQuestion[]>(
    initialSession?.questions ?? [],
  );
  const [index, setIndex] = useState(() => resumeIndex(initialSession));
  const [phase, setPhase] = useState<ClockPhase>("idle");
  const [remaining, setRemaining] = useState(0);
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);
  const [hearing, setHearing] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    answersMap(initialSession),
  );
  const [localError, setLocalError] = useState<string | undefined>(error);
  const [busy, setBusy] = useState(false);
  const [submitPct, setSubmitPct] = useState<number | null>(null);
  const [followPending, setFollowPending] = useState(false);
  const [addedSec, setAddedSec] = useState<number | null>(null);
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [pending, startTransition] = useTransition();
  const recognitionRef = useRef<SpeechRec | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioChainRef = useRef<Promise<void>>(Promise.resolve());
  const audioWarnedRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const finalRef = useRef("");
  const submittingRef = useRef(false);
  const finishingRef = useRef(false);
  const listeningRef = useRef(false);
  const answersRef = useRef<Record<string, string>>({});
  const questionRef = useRef<InterviewQuestion | undefined>(undefined);
  const sessionIdRef = useRef<string | null>(null);
  const questionsRef = useRef<InterviewQuestion[]>([]);
  const primaryEndsAtRef = useRef<number | null>(null);
  const graceEndsAtRef = useRef<number | null>(null);
  const phaseRef = useRef<ClockPhase>("idle");
  const resumePhaseRef = useRef<"running" | "grace">("running");
  const captureTimerRef = useRef<number | null>(null);

  const running = Boolean(sessionId && questions.length);
  const question = questions[index];
  const locked = busy || pending;
  questionRef.current = question;
  sessionIdRef.current = sessionId;
  answersRef.current = answers;
  questionsRef.current = questions;
  phaseRef.current = phase;

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (phase !== "running" && phase !== "grace") return;
    const id = window.setInterval(() => {
      if (finishingRef.current) return;
      const now = Date.now();
      if (phaseRef.current === "running") {
        const left = (primaryEndsAtRef.current ?? now) - now;
        setRemaining(left);
        if (left <= 0) {
          const graceEnd = now + INTERVIEW_GRACE_SEC * 1000;
          graceEndsAtRef.current = graceEnd;
          phaseRef.current = "grace";
          setPhase("grace");
          setRemaining(INTERVIEW_GRACE_SEC * 1000);
        }
        return;
      }
      const left = (graceEndsAtRef.current ?? now) - now;
      setRemaining(left);
      if (left <= 0) {
        void freezeAndSubmit();
      }
    }, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    return () => {
      listeningRef.current = false;
      teardown();
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!initialSession) return;
    const primaryEnd = interviewPrimaryEndMs(
      initialSession.startedAt,
      initialSession.durationSec,
      initialSession.frozenMs ?? 0,
    );
    const hardEnd = interviewHardEndMs(
      initialSession.startedAt,
      initialSession.durationSec,
      initialSession.frozenMs ?? 0,
    );
    const unanswered = initialSession.questions.some(
      (item) =>
        !initialSession.answers.some((answer) => answer.questionId === item.id),
    );
    primaryEndsAtRef.current = primaryEnd;
    graceEndsAtRef.current = hardEnd;
    if (Date.now() >= hardEnd || !unanswered) {
      if (!error) void freezeAndSubmit();
      return;
    }
    if (Date.now() >= primaryEnd) {
      phaseRef.current = "grace";
      setPhase("grace");
      setRemaining(hardEnd - Date.now());
    } else {
      phaseRef.current = "running";
      setPhase("running");
      setRemaining(primaryEnd - Date.now());
    }
    void (async () => {
      if (!(await armMic())) return;
      const current = initialSession.questions[resumeIndex(initialSession)];
      if (current) poseQuestion(current.text);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function teardown() {
    listeningRef.current = false;
    setHearing(false);
    if (captureTimerRef.current !== null) {
      window.clearTimeout(captureTimerRef.current);
      captureTimerRef.current = null;
    }
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function resetLocal() {
    finishingRef.current = false;
    submittingRef.current = false;
    listeningRef.current = false;
    finalRef.current = "";
    primaryEndsAtRef.current = null;
    graceEndsAtRef.current = null;
    phaseRef.current = "idle";
    setSessionId(null);
    setQuestions([]);
    setIndex(0);
    setAnswers({});
    setLiveStream(null);
    setPhase("idle");
    setRemaining(0);
    setBusy(false);
    setDialog(null);
  }

  function enqueueAudio(
    sessionId: string,
    questionId: string,
    blob: Blob,
    append: boolean,
  ) {
    audioChainRef.current = audioChainRef.current.then(async () => {
      const body = new FormData();
      body.append("audio", blob, `${questionId}.webm`);
      if (append) body.append("append", "1");
      try {
        await saveInterviewAudio(sessionId, questionId, body);
      } catch {
        if (!audioWarnedRef.current) {
          audioWarnedRef.current = true;
          pushToast("warn", dict.toastAudio);
        }
      }
    });
  }

  function rememberCurrentAnswer(): Record<string, string> {
    const current = questionRef.current;
    listeningRef.current = false;
    setHearing(false);
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (!current) return answersRef.current;
    const text = finalRef.current.trim();
    finalRef.current = "";
    const next = {
      ...answersRef.current,
      [current.id]: text || answersRef.current[current.id] || "",
    };
    answersRef.current = next;
    setAnswers(next);
    return next;
  }

  function releaseRecorder(): MediaRecorder | null {
    const recorder = recorderRef.current;
    recorderRef.current = null;
    return recorder;
  }

  function saveAnswerInBackground(
    sessionId: string,
    recorder: MediaRecorder | null,
    answers: Record<string, string>,
  ) {
    void (async () => {
      if (recorder && recorder.state !== "inactive") {
        await new Promise<void>((resolve) => {
          recorder.addEventListener("stop", () => resolve(), { once: true });
          recorder.stop();
        });
      }
      await audioChainRef.current;
      try {
        await saveInterviewProgress(
          sessionId,
          Object.entries(answers).map(([id, spoken]) => ({
            questionId: id,
            transcript: spoken,
          })),
        );
      } catch {
        /* finishInterview writes the full set */
      }
    })();
  }

  function startRecognition(reset: boolean) {
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setLocalError("stt");
      pushToast("error", dict.errorStt);
      return;
    }
    if (reset) {
      finalRef.current = "";
    }
    listeningRef.current = true;
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.onresult = (event) => {
      let finalText = finalRef.current;
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          finalText = `${finalText} ${event.results[i][0].transcript}`.trim();
        }
      }
      finalRef.current = finalText;
    };
    recognition.onerror = (event) => {
      if (event?.error === "aborted") return;
      if (!listeningRef.current || finishingRef.current) return;
      try {
        recognition.start();
      } catch {
        /* Chrome restarts via onend */
      }
    };
    recognition.onend = () => {
      if (!listeningRef.current || finishingRef.current) return;
      try {
        recognition.start();
      } catch {
        /* already running */
      }
    };
    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      recognitionRef.current = null;
    }
  }

  function startRecorder() {
    const stream = streamRef.current;
    const sessionId = sessionIdRef.current;
    const questionId = questionRef.current?.id;
    if (!stream || !sessionId || !questionId) return;
    let append = false;
    try {
      const recorder = new MediaRecorder(
        stream,
        MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? { mimeType: "audio/webm;codecs=opus", audioBitsPerSecond: 32_000 }
          : { audioBitsPerSecond: 32_000 },
      );
      recorder.ondataavailable = (event) => {
        if (event.data.size === 0) return;
        const blob = event.data;
        const useAppend = append;
        append = true;
        enqueueAudio(sessionId, questionId, blob, useAppend);
      };
      recorder.start(1000);
      recorderRef.current = recorder;
    } catch {
      recorderRef.current = null;
    }
  }

  function stopRecorder(): Promise<void> {
    const recorder = recorderRef.current;
    recorderRef.current = null;
    if (!recorder || recorder.state === "inactive") return audioChainRef.current;
    return new Promise<void>((resolve) => {
      recorder.addEventListener("stop", () => resolve(), { once: true });
      recorder.stop();
    }).then(() => audioChainRef.current);
  }

  function applySession(session: ResumeSession) {
    setSessionId(session.id);
    sessionIdRef.current = session.id;
    setQuestions(session.questions);
    questionsRef.current = session.questions;
    const map = answersMap(session);
    setAnswers(map);
    answersRef.current = map;
    setIndex(resumeIndex(session));
    const primaryEnd = interviewPrimaryEndMs(
      session.startedAt,
      session.durationSec,
      session.frozenMs ?? 0,
    );
    const hardEnd = interviewHardEndMs(
      session.startedAt,
      session.durationSec,
      session.frozenMs ?? 0,
    );
    primaryEndsAtRef.current = primaryEnd;
    graceEndsAtRef.current = hardEnd;
    const now = Date.now();
    if (now >= hardEnd) {
      phaseRef.current = "done";
      setPhase("done");
      setRemaining(0);
      return;
    }
    if (now >= primaryEnd) {
      phaseRef.current = "grace";
      setPhase("grace");
      setRemaining(hardEnd - now);
      return;
    }
    phaseRef.current = "running";
    setPhase("running");
    setRemaining(primaryEnd - now);
  }

  async function armMic(): Promise<boolean> {
    if (!getSpeechRecognition()) {
      setLocalError("stt");
      pushToast("error", dict.errorStt);
      return false;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setLiveStream(streamRef.current);
      return true;
    } catch {
      setLocalError("mic");
      pushToast("error", dict.errorMic);
      return false;
    }
  }

  async function begin() {
    setLocalError(undefined);
    setBusy(true);
    if (!(await armMic())) {
      setBusy(false);
      return;
    }

    startTransition(async () => {
      try {
        const session = await startInterview(module);
        finishingRef.current = false;
        submittingRef.current = false;
        applySession(session);
        const current = session.questions[resumeIndex(session)];
        if (current) poseQuestion(current.text);
        pushToast("success", dict.toastInterviewStarted);
        setBusy(false);
      } catch {
        teardown();
        setLiveStream(null);
        setBusy(false);
        pushToast("error", dict.errorGeneric);
      }
    });
  }

  function poseQuestion(text: string, onBeforeCapture?: () => void) {
    let started = false;
    let releasedClock = false;
    const start = () => {
      if (!releasedClock) {
        releasedClock = true;
        onBeforeCapture?.();
      }
      if (started || finishingRef.current) return;
      if (phaseRef.current !== "running" && phaseRef.current !== "grace") return;
      started = true;
      if (captureTimerRef.current !== null) {
        window.clearTimeout(captureTimerRef.current);
        captureTimerRef.current = null;
      }
      setHearing(true);
      startRecorder();
      startRecognition(true);
    };
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    captureTimerRef.current = window.setTimeout(
      start,
      Math.min(25_000, Math.max(3_000, words * 420)),
    );
    speak(text, () => {
      if (captureTimerRef.current !== null) {
        window.clearTimeout(captureTimerRef.current);
        captureTimerRef.current = null;
      }
      start();
    });
  }

  async function goNext() {
    if (locked || finishingRef.current || phaseRef.current === "transition") return;
    const current = questionRef.current;
    if (!current) return;

    const frozenAt = Date.now();
    setAddedSec(null);
    const officialLeft = (primaryEndsAtRef.current ?? frozenAt) - frozenAt;
    const inGrace = phaseRef.current === "grace";
    const officialRunning = phaseRef.current === "running" && officialLeft > 0;
    resumePhaseRef.current = inGrace ? "grace" : "running";
    const frozenLeft = inGrace
      ? (graceEndsAtRef.current ?? frozenAt) - frozenAt
      : officialLeft;
    phaseRef.current = "transition";
    setPhase("transition");
    setRemaining(Math.max(0, frozenLeft));
    setHearing(false);
    listeningRef.current = false;
    if (captureTimerRef.current !== null) {
      window.clearTimeout(captureTimerRef.current);
      captureTimerRef.current = null;
    }
    window.speechSynthesis.cancel();
    const released = releaseRecorder();
    const nextAnswers = rememberCurrentAnswer();
    const session = sessionIdRef.current;
    if (released && released.state !== "inactive") {
      void new Promise<void>((resolve) => {
        released.addEventListener("stop", () => resolve(), { once: true });
        released.stop();
      }).then(() => audioChainRef.current);
    } else {
      void audioChainRef.current;
    }

    const spoken = (nextAnswers[current.id] ?? "").trim();
    const answersPayload = Object.entries(nextAnswers).map(([questionId, transcript]) => ({
      questionId,
      transcript,
    }));
    let follow: (InterviewQuestion & { answerSec?: number }) | null = null;
    if (
      session &&
      hasApiKey &&
      officialRunning &&
      spoken &&
      !isFollowUpQuestion(current.id)
    ) {
      setFollowPending(true);
      try {
        follow = await maybeInterviewFollowUp(session, current.id, spoken);
      } catch {
        follow = null;
        pushToast("warn", dict.toastFollowUp);
        try {
          await saveInterviewProgress(session, answersPayload);
        } catch {
          /* finishInterview writes the full set */
        }
      }
      setFollowPending(false);
    } else if (session) {
      void saveInterviewProgress(session, answersPayload).catch(() => {});
    }

    if (finishingRef.current) return;

    const list = questionsRef.current;
    const at = list.findIndex((item) => item.id === current.id);
    if (follow && !list.some((item) => item.id === follow.id)) {
      const bonusMs = Math.max(0, follow.answerSec ?? 0) * 1000;
      const nextList = [...list.slice(0, at + 1), follow, ...list.slice(at + 1)];
      questionsRef.current = nextList;
      setQuestions(nextList);
      setIndex(at + 1);
      if (bonusMs > 0) setAddedSec(bonusMs / 1000);
      setRemaining(Math.max(0, frozenLeft + bonusMs));
      poseQuestion(follow.text, () => {
        const delta = Date.now() - frozenAt;
        if (primaryEndsAtRef.current !== null) {
          primaryEndsAtRef.current += delta + bonusMs;
        }
        if (graceEndsAtRef.current !== null) {
          graceEndsAtRef.current += delta + bonusMs;
        }
        if (session && delta > 0) void addInterviewFreeze(session, delta);
        const resume = resumePhaseRef.current;
        phaseRef.current = resume;
        setPhase(resume);
        const endsAt =
          resume === "grace" ? graceEndsAtRef.current : primaryEndsAtRef.current;
        setRemaining(Math.max(0, (endsAt ?? Date.now()) - Date.now()));
      });
      return;
    }

    const delta = Date.now() - frozenAt;
    if (primaryEndsAtRef.current !== null) primaryEndsAtRef.current += delta;
    if (graceEndsAtRef.current !== null) graceEndsAtRef.current += delta;
    if (session && delta > 0) void addInterviewFreeze(session, delta);
    const nextQuestion = list[at + 1];
    if (!nextQuestion) {
      freezeAndSubmit();
      return;
    }
    setIndex(at + 1);
    const resume = resumePhaseRef.current;
    phaseRef.current = resume;
    setPhase(resume);
    poseQuestion(nextQuestion.text);
  }

  function freezeAndSubmit() {
    if (finishingRef.current) return;
    finishingRef.current = true;
    phaseRef.current = "done";
    setPhase("done");
    setRemaining(0);
    setBusy(true);
    if (captureTimerRef.current !== null) {
      window.clearTimeout(captureTimerRef.current);
      captureTimerRef.current = null;
    }
    window.speechSynthesis.cancel();
    const released = releaseRecorder();
    const nextAnswers = rememberCurrentAnswer();
    const id = sessionIdRef.current;
    if (id) saveAnswerInBackground(id, released, nextAnswers);
    send(nextAnswers);
  }

  function send(nextAnswers: Record<string, string>) {
    const id = sessionIdRef.current;
    if (!id || submittingRef.current) return;
    submittingRef.current = true;
    teardown();
    setLiveStream(null);
    window.speechSynthesis.cancel();
    const list = questionsRef.current;
    const payload = list.map((item) => ({
      questionId: item.id,
      transcript: nextAnswers[item.id] ?? "",
    }));
    setSubmitPct(0);
    void (async () => {
      try {
        const response = await fetch("/api/interview/finish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: id, answers: payload }),
        });
        if (!response.ok || !response.body) {
          window.location.assign(feedbackHref(`/interview/${module}`, "error", "llm"));
          return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let errorCode: string | null = null;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const message = JSON.parse(line) as { pct?: number; error?: string };
            if (typeof message.pct === "number") {
              const pct = Math.max(0, Math.min(100, Math.round(message.pct)));
              setSubmitPct((current) => Math.max(current ?? 0, pct));
            }
            if (message.error) errorCode = message.error;
          }
        }
        if (errorCode === "onboarding") {
          window.location.assign("/onboarding");
          return;
        }
        if (errorCode === "session") {
          window.location.assign(feedbackHref("/", "error", "session"));
          return;
        }
        if (errorCode) {
          window.location.assign(feedbackHref(`/interview/${module}`, "error", errorCode));
          return;
        }
        setSubmitPct(100);
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        window.location.assign(feedbackHref(`/interview/${module}`, "ok", "interview"));
      } catch {
        window.location.assign(feedbackHref(`/interview/${module}`, "error", "llm"));
      }
    })();
  }

  async function confirmStop() {
    const id = sessionIdRef.current;
    finishingRef.current = true;
    listeningRef.current = false;
    teardown();
    window.speechSynthesis.cancel();
    if (id) {
      try {
        await abandonInterview(id);
        pushToast("success", dict.toastInterviewStopped);
      } catch {
        pushToast("warn", dict.toastInterviewStopWarn);
      }
    }
    resetLocal();
  }

  async function confirmRestart() {
    const id = sessionIdRef.current;
    finishingRef.current = true;
    listeningRef.current = false;
    teardown();
    window.speechSynthesis.cancel();
    if (id) {
      try {
        await abandonInterview(id);
      } catch {
        pushToast("warn", dict.toastInterviewStopWarn);
      }
    }
    resetLocal();
    await begin();
  }

  function dialogCopy() {
    if (dialog === "start") {
      return {
        title: dict.interviewStartConfirmTitle,
        body: dict.interviewStartConfirmBody,
        onConfirm: () => {
          setDialog(null);
          void begin();
        },
      };
    }
    if (dialog === "stop") {
      return {
        title: dict.interviewStopConfirmTitle,
        body: dict.interviewStopConfirmBody,
        onConfirm: () => {
          setDialog(null);
          void confirmStop();
        },
      };
    }
    return {
      title: dict.interviewRestartConfirmTitle,
      body: dict.interviewRestartConfirmBody,
      onConfirm: () => {
        setDialog(null);
        void confirmRestart();
      },
    };
  }

  if (!running) {
    return (
      <div className="mt-8 flex max-w-2xl flex-col gap-4">
        <FormError dict={dict} code={localError} />
        {!hasApiKey ? (
          <p className="text-sm text-[var(--muted)]">{dict.missingKeyHint}</p>
        ) : null}
        <p className="text-sm leading-6 text-[var(--muted)]">{dict.interviewChrome}</p>
        <p className="text-sm leading-6">{dict.interviewRules}</p>
        <button
          type="button"
          onClick={() => setDialog("start")}
          disabled={locked}
          className="inline-flex h-11 w-fit items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)] disabled:opacity-60"
        >
          {locked ? dict.saving : dict.interviewStart}
        </button>
        {dialog === "start" ? (
          <ConfirmDialog
            title={dialogCopy().title}
            body={dialogCopy().body}
            confirmLabel={dict.interviewConfirmYes}
            cancelLabel={dict.interviewConfirmNo}
            onConfirm={dialogCopy().onConfirm}
            onCancel={() => setDialog(null)}
          />
        ) : null}
      </div>
    );
  }

  const copy = dialog ? dialogCopy() : null;

  return (
    <div className="mt-8 flex max-w-2xl flex-col gap-5">
      <FormError dict={dict} code={localError} />
      {phase === "grace" ? (
        <p className="text-sm text-[var(--accent)]">{dict.interviewGrace}</p>
      ) : null}
      <p className="font-[family-name:var(--font-serif)] text-3xl tabular-nums">
        {formatTime(remaining)}
      </p>
      <p className="text-sm text-[var(--muted)]">
        {dict.interviewQuestion} {index + 1}/{questions.length}
        {question && isFollowUpQuestion(question.id)
          ? ` · ${dict.interviewFollowUp}`
          : ""}
      </p>
      <p className="text-lg leading-8">{question?.text}</p>
      {followPending ? (
        <p className="text-sm text-[var(--accent)]">{dict.interviewFollowUpWait}</p>
      ) : null}
      {addedSec ? (
        <p className="text-sm text-[var(--accent)]">
          {dict.interviewFollowUpAdded} {addedSec}s
        </p>
      ) : null}
      <button
        type="button"
        className="w-fit rounded-sm border border-[var(--line)] px-3 py-1.5 text-sm hover:bg-[var(--chip)] disabled:opacity-60"
        onClick={() => {
          if (!question || phase === "transition" || locked) return;
          void (async () => {
            listeningRef.current = false;
            setHearing(false);
            recognitionRef.current?.stop();
            recognitionRef.current = null;
            await stopRecorder();
            if (phaseRef.current === "running" || phaseRef.current === "grace") {
              poseQuestion(question.text);
            }
          })();
        }}
        disabled={locked}
      >
        {dict.interviewSpeakAgain}
      </button>
      <p className="text-sm text-[var(--muted)]">{dict.interviewCapturing}</p>
      <AudioLevelBars stream={liveStream} active={hearing} />
      {submitPct !== null ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between text-sm">
            <span>{dict.interviewSending}</span>
            <span className="tabular-nums">
              {submitPct}% · {dict.interviewSendingLeft} {100 - submitPct}%
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[var(--chip)]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={submitPct}
            aria-label={`${dict.interviewSending} ${submitPct}%`}
          >
            <div
              className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
              style={{ width: `${submitPct}%` }}
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void goNext()}
          disabled={locked || phase === "transition" || followPending}
          className="inline-flex h-11 w-fit items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)] disabled:opacity-60"
        >
          {locked
            ? submitPct !== null
              ? `${submitPct}%`
              : dict.analyzing
            : index + 1 >= questions.length &&
                (phase === "grace" ||
                  !hasApiKey ||
                  (question ? isFollowUpQuestion(question.id) : false))
              ? dict.interviewFinish
              : dict.interviewNext}
        </button>
        <button
          type="button"
          onClick={() => setDialog("stop")}
          disabled={locked}
          className="inline-flex h-11 w-fit items-center justify-center rounded-sm border border-[var(--line)] px-5 text-sm hover:bg-[var(--chip)] disabled:opacity-60"
        >
          {dict.interviewStop}
        </button>
        <button
          type="button"
          onClick={() => setDialog("restart")}
          disabled={locked}
          className="inline-flex h-11 w-fit items-center justify-center rounded-sm border border-[var(--line)] px-5 text-sm hover:bg-[var(--chip)] disabled:opacity-60"
        >
          {dict.interviewRestart}
        </button>
      </div>
      {copy ? (
        <ConfirmDialog
          title={copy.title}
          body={copy.body}
          confirmLabel={dict.interviewConfirmYes}
          cancelLabel={dict.interviewConfirmNo}
          onConfirm={copy.onConfirm}
          onCancel={() => setDialog(null)}
        />
      ) : null}
    </div>
  );
}
