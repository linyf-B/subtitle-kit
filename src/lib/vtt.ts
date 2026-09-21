export interface VttCue {
  startMs: number;
  endMs: number;
  text: string;
  cueId?: string;
}

const FULL_TIME_RE =
  /(\d{2}):(\d{2}):(\d{2})[.,](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[.,](\d{3})/;

function toMs(h: number, m: number, s: number, ms: number): number {
  return ((h * 60 + m) * 60 + s) * 1000 + ms;
}

function fromMs(totalMs: number): string {
  const ms = Math.max(0, Math.round(totalMs));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const rest = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(rest).padStart(3, "0")}`;
}

export function parseVtt(raw: string): VttCue[] {
  let normalized = raw.replace(/\r\n/g, "\n").replace(/^\uFEFF/, "").trim();
  if (!normalized) return [];
  if (/^WEBVTT/i.test(normalized)) {
    normalized = normalized.replace(/^WEBVTT[^\n]*\n/, "").trim();
  }
  const blocks = normalized.split(/\n\n+/);
  const cues: VttCue[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith("NOTE") || trimmed.startsWith("STYLE")) continue;
    const lines = trimmed.split("\n");
    let timeLineIdx = 0;
    let cueId: string | undefined;
    if (lines.length >= 2 && !FULL_TIME_RE.test(lines[0])) {
      cueId = lines[0].trim();
      timeLineIdx = 1;
    }
    const match = FULL_TIME_RE.exec(lines[timeLineIdx] ?? "");
    if (!match) continue;
    const startMs = toMs(+match[1], +match[2], +match[3], +match[4]);
    const endMs = toMs(+match[5], +match[6], +match[7], +match[8]);
    const text = lines.slice(timeLineIdx + 1).join("\n");
    cues.push({ startMs, endMs, text, cueId });
  }
  return cues;
}

export function serializeVtt(cues: VttCue[]): string {
  const body = cues
    .map((c) => {
      const idLine = c.cueId ? `${c.cueId}\n` : "";
      return `${idLine}${fromMs(c.startMs)} --> ${fromMs(c.endMs)}\n${c.text}`;
    })
    .join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}

export function shiftVtt(cues: VttCue[], offsetMs: number): VttCue[] {
  return cues.map((c) => {
    let startMs = Math.max(0, c.startMs + offsetMs);
    let endMs = Math.max(0, c.endMs + offsetMs);
    if (endMs < startMs) endMs = startMs;
    return { ...c, startMs, endMs };
  });
}

/** Convert parsed cues to WebVTT text (adds WEBVTT header). */
export function cuesToVttText(
  cues: { startMs: number; endMs: number; text: string }[],
): string {
  return serializeVtt(
    cues.map((c) => ({
      startMs: c.startMs,
      endMs: c.endMs,
      text: c.text,
    })),
  );
}
