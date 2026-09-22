"use client";

import { useEffect, useState } from "react";

const BAR_COUNT = 16;

export function AudioLevelBars({
  stream,
  active,
}: {
  stream: MediaStream | null;
  active: boolean;
}) {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 0),
  );

  useEffect(() => {
    if (!stream || !active) {
      setLevels(Array.from({ length: BAR_COUNT }, () => 0));
      return;
    }

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.65;
    source.connect(analyser);
    const bins = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      analyser.getByteFrequencyData(bins);
      const next = Array.from({ length: BAR_COUNT }, (_, index) => {
        const start = Math.floor((index * bins.length) / BAR_COUNT);
        const end = Math.max(start + 1, Math.floor(((index + 1) * bins.length) / BAR_COUNT));
        let sum = 0;
        for (let i = start; i < end; i += 1) sum += bins[i] ?? 0;
        return Math.min(1, sum / (end - start) / 180);
      });
      setLevels(next);
      frame = window.requestAnimationFrame(tick);
    };

    void audioContext.resume().then(() => {
      if (!stopped) tick();
    });

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      source.disconnect();
      void audioContext.close();
    };
  }, [stream, active]);

  return (
    <div
      className="flex h-16 items-end gap-1"
      aria-hidden="true"
    >
      {levels.map((level, index) => (
        <span
          key={index}
          className="flex-1 rounded-sm bg-[var(--accent)]"
          style={{ height: `${Math.max(8, Math.round(level * 64))}px` }}
        />
      ))}
    </div>
  );
}
