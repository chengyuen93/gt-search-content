import { cleanup, render, screen } from '@testing-library/react';
import { Suggestions } from '../../components';
import userEvent from '@testing-library/user-event';

describe('Suggestions', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly when it is loading', () => {
    const view = render(
      <Suggestions
        isLoading
        isFailed={false}
        isSuccessful={false}
        anchorEl={null}
        suggestions={[]}
        onSelected={jest.fn}
      />
    );

    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('Fetching ..');
  });

  it('should render correctly when it is failed to retrieve data', () => {
    const view = render(
      <Suggestions
        isLoading={false}
        isFailed
        isSuccessful={false}
        anchorEl={null}
        suggestions={[]}
        onSelected={jest.fn}
      />
    );

    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('Failed to fetch suggestions.');
  });

  it('should render correctly when it is successful to retrieve data but there is not data', () => {
    const view = render(
      <Suggestions
        isLoading={false}
        isFailed={false}
        isSuccessful
        anchorEl={null}
        suggestions={[]}
        onSelected={jest.fn}
      />
    );

    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('No suggestions.');
  });

  it('should render correctly when it is successful to retrieve data and there is data', () => {
    render(
      <Suggestions
        isLoading={false}
        isFailed={false}
        isSuccessful
        anchorEl={null}
        suggestions={[
          {
            Text: 'this is a test string',
            Highlights: [],
          },
          {
            Text: 'this is a test string 2',
            Highlights: [],
          },
        ]}
        onSelected={jest.fn}
      />
    );

    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    expect(screen.getByTestId('suggestion-item-0')).toBeTruthy();
    expect(screen.getByTestId('suggestion-item-1')).toBeTruthy();
  });

  it('should behave correct when keyboard event is fired', async () => {
    const mockOnSelect = jest.fn();
    render(
      <Suggestions
        isLoading={false}
        isFailed={false}
        isSuccessful
        anchorEl={null}
        suggestions={[
          {
            Text: 'this is a test string',
            Highlights: [],
          },
          {
            Text: 'this is a test string 2',
            Highlights: [],
          },
        ]}
        onSelected={mockOnSelect}
      />
    );

    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    expect(screen.getByTestId('suggestion-item-0')).toBeTruthy();
    expect(screen.getByTestId('suggestion-item-1')).toBeTruthy();

    await userEvent.keyboard('{arrowup}');
    expect(
      screen
        .getByTestId('suggestion-item-1')
        .classList.contains('suggestion_item_highlighted')
    ).toBeTruthy();

    await userEvent.keyboard('{arrowdown}');
    expect(
      screen
        .getByTestId('suggestion-item-0')
        .classList.contains('suggestion_item_highlighted')
    ).toBeTruthy();
    expect(
      !screen
        .getByTestId('suggestion-item-1')
        .classList.contains('suggestion_item_highlighted')
    ).toBeTruthy();

    await userEvent.keyboard('{enter}');
    expect(mockOnSelect).toHaveBeenCalledWith('this is a test string');
  });
});
