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
  return cues.map((c) => {
    let startMs = Math.max(0, c.startMs + offsetMs);
    let endMs = Math.max(0, c.endMs + offsetMs);
    if (endMs < startMs) endMs = startMs;
    return { ...c, startMs, endMs };
  });
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

const HTML_ENTITY: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

export function stripHtmlTags(text: string): string {
  let t = text.replace(/<[^>]*>/g, "");
  t = t.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => HTML_ENTITY[m] ?? m);
  return t.replace(/\s+\n/g, "\n").trim();
}

export function stripHtmlInCues(cues: SrtCue[]): SrtCue[] {
  return cues.map((c) => ({ ...c, text: stripHtmlTags(c.text) }));
}

/** Merge consecutive cues when gap between end and next start ≤ maxGapMs. */
export function mergeConsecutiveCues(cues: SrtCue[], maxGapMs: number): SrtCue[] {
  if (!cues.length) return [];
  const merged: SrtCue[] = [];
  let cur = { ...cues[0] };
  for (let i = 1; i < cues.length; i++) {
    const next = cues[i];
    const gap = next.startMs - cur.endMs;
    if (gap <= maxGapMs) {
      cur.endMs = next.endMs;
      cur.text = `${cur.text}\n${next.text}`;
    } else {
      merged.push({ ...cur, index: merged.length + 1 });
      cur = { ...next };
    }
  }
  merged.push({ ...cur, index: merged.length + 1 });
  return merged.map((c, i) => ({ ...c, index: i + 1 }));
}

/** Split each cue with multiple lines into separate cues with evenly divided duration. */
export function splitCuesByLine(cues: SrtCue[]): SrtCue[] {
  const out: SrtCue[] = [];
  for (const c of cues) {
    const lines = c.text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      out.push({ ...c, text: lines[0] ?? c.text, index: out.length + 1 });
      continue;
    }
    const total = Math.max(1, c.endMs - c.startMs);
    const slice = Math.floor(total / lines.length);
    lines.forEach((line, i) => {
      const startMs = c.startMs + i * slice;
      const endMs = i === lines.length - 1 ? c.endMs : c.startMs + (i + 1) * slice;
      out.push({ index: out.length + 1, startMs, endMs, text: line });
    });
  }
  return out.map((c, i) => ({ ...c, index: i + 1 }));
}

/** Convert milliseconds to frame count at given fps (for sync math). */
export function msToFrames(ms: number, fps: number): number {
  if (fps <= 0) return 0;
  return (ms / 1000) * fps;
}

export function framesToMs(frames: number, fps: number): number {
  if (fps <= 0) return 0;
  return (frames / fps) * 1000;
}
