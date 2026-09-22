import type { ReactNode } from "react";
import { InfoTip } from "@/components/InfoTip";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { TIP_MARKS, type TipId } from "@/lib/i18n/tips";

function compile(pattern: string, flags: string | undefined) {
  const body = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const insensitive = flags?.includes("i") ?? false;
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])`, insensitive ? "giu" : "gu");
}

export function TipIcon({
  dict,
  id,
  align = "start",
}: {
  dict: Dictionary;
  id: TipId;
  align?: "start" | "end";
}) {
  const tip = dict.tips[id];
  return (
    <InfoTip
      label={tip.label}
      what={tip.what}
      applies={tip.applies}
      whatLabel={dict.tipWhat}
      appliesLabel={dict.tipApplies}
      align={align}
    />
  );
}

export function Copy({
  dict,
  text,
  align = "start",
}: {
  dict: Dictionary;
  text: string;
  align?: "start" | "end";
}) {
  const marks = [...TIP_MARKS[dict.locale]].sort(
    (a, b) => b.pattern.length - a.pattern.length,
  );
  type Hit = { start: number; end: number; id: TipId };
  const hits: Hit[] = [];
  for (const mark of marks) {
    const expression = compile(mark.pattern, mark.flags);
    for (const match of text.matchAll(expression)) {
      const start = match.index ?? 0;
      hits.push({ start, end: start + match[0].length, id: mark.id });
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  const kept: Hit[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    kept.push(hit);
    cursor = hit.end;
  }

  const nodes: ReactNode[] = [];
  let index = 0;
  for (const hit of kept) {
    if (hit.start > index) nodes.push(text.slice(index, hit.start));
    const tip = dict.tips[hit.id];
    nodes.push(
      <span key={`${hit.id}-${hit.start}`}>
        {text.slice(hit.start, hit.end)}
        <InfoTip
          label={tip.label}
          what={tip.what}
          applies={tip.applies}
          whatLabel={dict.tipWhat}
          appliesLabel={dict.tipApplies}
          align={align}
        />
      </span>,
    );
    index = hit.end;
  }
  if (index < text.length) nodes.push(text.slice(index));
  return <>{nodes}</>;
}
