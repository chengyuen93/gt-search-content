import { cleanup, render, screen } from '@testing-library/react';
import {
  H3,
  H4,
  H6,
  Huge,
  MixedHighlightText,
  OfficialText,
  Text,
} from '../../components';

describe('Fonts', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render Huge text correctly', () => {
    render(
      <>
        <Huge>Huge Text Regular</Huge>
        <Huge isBold>Huge Text Bold</Huge>
        <Huge isError>Huge Text Error</Huge>
      </>
    );
    const textComponent = screen.getByText('Huge Text Regular');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('huge');
    const textComponentBold = screen.getByText('Huge Text Bold');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('huge');
    expect(textComponentBold).toHaveClass('semibold');
    const textComponentError = screen.getByText('Huge Text Error');
    expect(textComponentError).toBeTruthy();
    expect(textComponentError).toHaveClass('huge');
    expect(textComponentError).toHaveClass('error');
  });

  it('should render H3 text correctly', () => {
    render(
      <>
        <H3>H3 Text Regular</H3>
        <H3 isBold>H3 Text Bold</H3>
        <H3 isError>H3 Text Error</H3>
      </>
    );
    const textComponent = screen.getByText('H3 Text Regular');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('h3');
    const textComponentBold = screen.getByText('H3 Text Bold');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('h3');
    expect(textComponentBold).toHaveClass('semibold');
    const textComponentError = screen.getByText('H3 Text Error');
    expect(textComponentError).toBeTruthy();
    expect(textComponentError).toHaveClass('h3');
    expect(textComponentError).toHaveClass('error');
  });

  it('should render H4 text correctly', () => {
    render(
      <>
        <H4>H4 Text Regular</H4>
        <H4 isBold>H4 Text Bold</H4>
        <H4 isError>H4 Text Error</H4>
      </>
    );
    const textComponent = screen.getByText('H4 Text Regular');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('h4');
    const textComponentBold = screen.getByText('H4 Text Bold');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('h4');
    expect(textComponentBold).toHaveClass('semibold');
    const textComponentError = screen.getByText('H4 Text Error');
    expect(textComponentError).toBeTruthy();
    expect(textComponentError).toHaveClass('h4');
    expect(textComponentError).toHaveClass('error');
  });

  it('should render H6 text correctly', () => {
    render(
      <>
        <H6>H6 Text Regular</H6>
        <H6 isBold>H6 Text Bold</H6>
        <H6 isError>H6 Text Error</H6>
      </>
    );
    const textComponent = screen.getByText('H6 Text Regular');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('h6');
    const textComponentBold = screen.getByText('H6 Text Bold');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('h6');
    expect(textComponentBold).toHaveClass('semibold');
    const textComponentError = screen.getByText('H6 Text Error');
    expect(textComponentError).toBeTruthy();
    expect(textComponentError).toHaveClass('h6');
    expect(textComponentError).toHaveClass('error');
  });

  it('should render body text correctly', () => {
    render(
      <>
        <Text>Body Text Regular</Text>
        <Text isBold>Body Text Bold</Text>
        <Text isError>Body Text Error</Text>
      </>
    );
    const textComponent = screen.getByText('Body Text Regular');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('display_body');
    const textComponentBold = screen.getByText('Body Text Bold');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('display_body');
    expect(textComponentBold).toHaveClass('semibold');
    const textComponentError = screen.getByText('Body Text Error');
    expect(textComponentError).toBeTruthy();
    expect(textComponentError).toHaveClass('display_body');
    expect(textComponentError).toHaveClass('error');
  });

  it('should render official text correctly', () => {
    render(
      <>
        <OfficialText>Official Text Regular</OfficialText>
        <OfficialText isBold>Official Text Bold</OfficialText>
      </>
    );
    const textComponent = screen.getByText('Official Text Regular');
    const textComponentBold = screen.getByText('Official Text Bold');
    expect(textComponent).toBeTruthy();
    expect(textComponent).toHaveClass('official_text');
    expect(textComponentBold).toBeTruthy();
    expect(textComponentBold).toHaveClass('official_text');
    expect(textComponentBold).toHaveClass('official_text_bold');
  });

  it('should render mixed highlighted text correctly without highlights', () => {
    render(
      <MixedHighlightText
        info={{ Text: 'this is a test string', Highlights: [] }}
        RegularTextComponent={H3}
        HighlightedTextComponent={H4}
        highlightTextProps={{ testId: 'highlight' }}
      />
    );
    expect(screen.queryAllByTestId('hightlight').length).toBe(0);
  });

  it('should render mixed highlighted text correctly with highlights', () => {
    render(
      <MixedHighlightText
        info={{
          Text: 'this is a test string',
          Highlights: [{ BeginOffset: 2, EndOffset: 5 }],
        }}
        RegularTextComponent={H3}
        HighlightedTextComponent={H4}
        highlightTextProps={{ testId: 'highlight' }}
      />
    );

    expect(screen.queryAllByTestId('highlight').length).toBe(1);
  });
});
