import { HighlightableText, Offsets } from '../types';

const extractHighlightOffsets = (matches: RegExpMatchArray[]): Offsets[] => {
  const offsets: Offsets[] = [];
  for (const data of matches) {
    if (data.index === undefined) continue;

    offsets.push({
      BeginOffset: data.index,
      EndOffset: data.index + data[0].length,
    });
  }
  return offsets;
};

export const filterPartialTextContainMatch = (
  values: string[],
  match: string
): HighlightableText[] => {
  const regex = new RegExp(match, 'ig');
  const filteredData: HighlightableText[] = [];
  for (const value of values) {
    const matches = Array.from(value.matchAll(regex));
    if (!matches.length) continue;
    const highlightable: HighlightableText = {
      Text: value,
      Highlights: extractHighlightOffsets(matches),
    };
    filteredData.push(highlightable);
  }
  return filteredData;
};
