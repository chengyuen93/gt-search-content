import { escapeStringForRegex } from '../../utils';

describe('escapeString', () => {
  it('special character should be properly escaped', () => {
    const text = '\\*^$+?.()[]{}|TestString';
    const expectedText =
      '\\\\\\*\\^\\$\\+\\?\\.\\(\\)\\[\\]\\{\\}\\|TestString';
    expect(escapeStringForRegex(text)).toEqual(expectedText);
  });

  it('expect space to be properly escaped', () => {
    const text = 'this is a test string';
    const expectedText = 'this\\sis\\sa\\stest\\sstring';
    expect(escapeStringForRegex(text)).toEqual(expectedText);
  });
});
