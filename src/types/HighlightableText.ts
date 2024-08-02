export interface Offsets {
  BeginOffset: number;
  EndOffset: number;
}

export interface HighlightableText {
  Highlights: Offsets[];
  Text: string;
}
