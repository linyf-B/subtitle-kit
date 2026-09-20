export interface SrtCue {
  index: number;
  startMs: number;
  endMs: number;
  text: string;
}

const TIME_RE =
  /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/;

function toMs(h: number, m: number, s: number, ms: number): number {
  return ((h * 60 + m) * 60 + s) * 1000 + ms;
}

function fromMs(totalMs: number): string {
  const ms = Math.max(0, Math.round(totalMs));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const rest = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(rest).padStart(3, "0")}`;
}

export function parseSrt(raw: string): SrtCue[] {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  const blocks = normalized.split(/\n\n+/);
  const cues: SrtCue[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").filter((l) => l.trim() !== "");
    if (lines.length < 2) continue;
    let lineIdx = 0;
    const maybeIndex = parseInt(lines[0], 10);
    if (!Number.isNaN(maybeIndex) && String(maybeIndex) === lines[0].trim()) {
      lineIdx = 1;
    }
    const timeLine = lines[lineIdx];
    const match = TIME_RE.exec(timeLine);
    if (!match) continue;
    const startMs = toMs(+match[1], +match[2], +match[3], +match[4]);
    const endMs = toMs(+match[5], +match[6], +match[7], +match[8]);
    const text = lines.slice(lineIdx + 1).join("\n");
    cues.push({
      index: cues.length + 1,
      startMs,
      endMs,
      text,
    });
  }
  return cues;
}

export function serializeSrt(cues: SrtCue[]): string {
  return cues
    .map(
      (c, i) =>
        `${i + 1}\n${fromMs(c.startMs)} --> ${fromMs(c.endMs)}\n${c.text}`,
    )
    .join("\n\n");
}

export function shiftSrt(cues: SrtCue[], offsetMs: number): SrtCue[] {
  return cues.map((c) => ({
    ...c,
    startMs: Math.max(0, c.startMs + offsetMs),
    endMs: Math.max(0, c.endMs + offsetMs),
  }));
}

export function srtToPlainText(
  cues: SrtCue[],
  opts: { includeSpeaker: boolean; oneLinePerCue: boolean },
): string {
  return cues
    .map((c) => {
      const t = c.text.replace(/\n/g, opts.oneLinePerCue ? " " : "\n");
      return opts.includeSpeaker ? `[${fromMs(c.startMs)}] ${t}` : t;
    })
    .join("\n\n");
}

export function estimateDurationSeconds(
  text: string,
  wordsPerMinute: number,
): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const cjk = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const effectiveWords = words + Math.ceil(cjk / 2);
  return (effectiveWords / wordsPerMinute) * 60;
}

export function maxLineLength(text: string): { max: number; lines: string[] } {
  const lines = text.split(/\n/);
  let max = 0;
  for (const line of lines) {
    max = Math.max(max, [...line].length);
  }
  return { max, lines };
}
