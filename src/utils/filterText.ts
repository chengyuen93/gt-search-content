import { HighlightableText, Offsets } from '../types';
import { escapeString } from './escapeString';

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

export const filterTextContainMatch = (
  values: string[],
  match: string,
  matchWholeWord?: boolean
): HighlightableText[] => {
  match = escapeString(match);
  const regex = new RegExp(
    matchWholeWord ? '\\w*' + match + '\\w*' : match,
    'ig'
  );

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
