import { HighlightableText, Offsets } from '../types';
import { escapeStringForRegex } from './escapeString';

/**
 * extract the start and end offset indices of the affected substring
 * @param matches arrays of `RegExpMatchArray` from the `matchAll` function
 * @returns an array of start and end indices of affected substrings
 */
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

/**
 * check which part of the string matches the search text and returns the corresponding indices
 * @param values an array of text to be compared with the search text
 * @param match search text
 * @param matchWholeWord whether to include the whole word that partially matches the search text, or just the affected substring
 * @returns an array of texts and their corresponding matched indices
 */
export const filterTextContainMatch = (
  values: string[],
  match: string,
  matchWholeWord?: boolean
): HighlightableText[] => {
  match = escapeStringForRegex(match);
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
