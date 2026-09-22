import { completeInterviewFinish, InterviewFinishError } from "@/lib/interview/finish";
import type { InterviewAnswer } from "@/lib/storage/store";

export const dynamic = "force-dynamic";

type ProgressEvent = { pct: number } | { error: string };

function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) controller.close();
      else controller.enqueue(value);
    },
  });
}

function progressQueue() {
  const queue: Array<ProgressEvent | null> = [];
  let resolvePending: (() => void) | null = null;
  let pending: Promise<void> | null = null;

  const wake = () => {
    resolvePending?.();
    resolvePending = null;
    pending = null;
  };

  return {
    push(event: ProgressEvent) {
      queue.push(event);
      wake();
    },
    close() {
      queue.push(null);
      wake();
    },
    async *iterate() {
      const encoder = new TextEncoder();
      while (true) {
        while (queue.length === 0) {
          if (!pending) {
            pending = new Promise<void>((resolve) => {
              resolvePending = resolve;
            });
          }
          await pending;
        }
        const event = queue.shift();
        if (event == null) return;
        yield encoder.encode(`${JSON.stringify(event)}\n`);
      }
    },
  };
}

export async function POST(request: Request) {
  let body: { sessionId?: string; answers?: InterviewAnswer[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "session" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim() ?? "";
  const answers = Array.isArray(body.answers) ? body.answers : null;
  if (!sessionId || !answers) {
    return Response.json({ error: "session" }, { status: 400 });
  }

  const events = progressQueue();
  void completeInterviewFinish(sessionId, answers, (pct) => {
    events.push({ pct });
  })
    .then(() => {
      events.close();
    })
    .catch((error: unknown) => {
      const code = error instanceof InterviewFinishError ? error.code : "llm";
      events.push({ error: code });
      events.close();
    });

  return new Response(iteratorToStream(events.iterate()), {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
