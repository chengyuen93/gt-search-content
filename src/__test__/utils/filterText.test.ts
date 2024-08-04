import { filterTextContainMatch } from '../../utils';

const values = [
  'this is a test string',
  'i am sitting for a test and the Test Center is so hot i am literally SWEATING',
  'the apple is nice',
];
const match = 'ing';

describe('filterText', () => {
  it('should return the correct index for substring', () => {
    const result = filterTextContainMatch(values, match, false);
    expect(result.length).toBe(2);
    expect(result[0].Highlights.length).toBe(1);
    expect(result[0].Highlights[0]).toStrictEqual({
      BeginOffset: 18,
      EndOffset: 21,
    });

    expect(result[1].Highlights.length).toBe(2);
    expect(result[1].Highlights[0]).toStrictEqual({
      BeginOffset: 9,
      EndOffset: 12,
    });
    expect(result[1].Highlights[1]).toStrictEqual({
      BeginOffset: 74,
      EndOffset: 77,
    });
  });

  it('should return the correct index for whole word', () => {
    const result = filterTextContainMatch(values, match, true);
    expect(result.length).toBe(2);
    expect(result[0].Highlights.length).toBe(1);
    expect(result[0].Highlights[0]).toStrictEqual({
      BeginOffset: 15,
      EndOffset: 21,
    });

    expect(result[1].Highlights.length).toBe(2);
    expect(result[1].Highlights[0]).toStrictEqual({
      BeginOffset: 5,
      EndOffset: 12,
    });
    expect(result[1].Highlights[1]).toStrictEqual({
      BeginOffset: 69,
      EndOffset: 77,
    });
  });
});
