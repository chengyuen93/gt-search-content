import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '../../components';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { HighlightableText } from '../../types';

jest.mock('../../assets', () => ({
  SharedImages: {
    search: 'search_icon',
    close: 'close_icon',
  },
}));

describe('SearchBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(<SearchBar onSearch={jest.fn} />);

    expect(screen.getByTestId('search-bar')).toBeTruthy();
    expect(screen.getByTestId('search-bar-input')).toBeTruthy();
    expect(screen.queryByTestId('close-button')).toBeFalsy();
    expect(screen.getByTestId('search-button')).toBeTruthy();
  });

  it('should render close button when more than 1 character is keyed in', async () => {
    render(<SearchBar onSearch={jest.fn} />);

    await userEvent.type(screen.getByTestId('search-bar-input'), 'h');

    expect(screen.getByTestId('close-button')).toBeTruthy();
  });

  it('should clear text when close button is clicked', async () => {
    render(<SearchBar onSearch={jest.fn} />);

    await userEvent.type(screen.getByTestId('search-bar-input'), 'h');

    expect(screen.getByTestId('close-button')).toBeTruthy();
    await userEvent.click(screen.getByTestId('close-button'));
    expect(screen.queryByTestId('close-button')).toBeFalsy();
    expect(screen.getByTestId('search-bar-input').getAttribute('value')).toBe(
      ''
    );
  });

  it('should search when search button is clicked', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    await userEvent.click(screen.getByTestId('search-bar-input'));
    await userEvent.click(screen.getByTestId('search-button'));

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should search when Enter is pressed', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    await userEvent.click(screen.getByTestId('search-bar-input'));
    await userEvent.keyboard('{enter}');

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should open suggestions when typed in more than 2 characters', async () => {
    const mockOnSuggest = jest.fn();
    render(<SearchBar onSearch={jest.fn} onSuggest={mockOnSuggest} />);

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();

    await userEvent.type(screen.getByTestId('search-bar-input'), 'he');

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();

    await userEvent.type(screen.getByTestId('search-bar-input'), 'help');

    expect(mockOnSuggest).toHaveBeenCalled();
    expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
  });

  it('should be able to use searchbar without suggestion feature', async () => {
    render(<SearchBar onSearch={jest.fn} />);

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();

    await userEvent.type(screen.getByTestId('search-bar-input'), 'he');

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();

    await userEvent.type(screen.getByTestId('search-bar-input'), 'help');

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();
  });

  it('should update input value and search when a suggestion is clicked', async () => {
    const mockOnSuggest = jest.fn();
    const mockOnSearch = jest.fn();

    const TestComponent = () => {
      const [suggestions, setSuggestions] = useState<HighlightableText[]>([]);

      useEffect(() => {
        setTimeout(() => {
          setSuggestions([
            {
              Text: 'this is a test string',
              Highlights: [],
            },
          ]);
        }, 1000);
      }, []);

      return (
        <SearchBar
          onSearch={mockOnSearch}
          onSuggest={mockOnSuggest}
          suggestionsIsSuccessful
          suggestions={suggestions}
        />
      );
    };
    render(<TestComponent />);

    await userEvent.type(screen.getByTestId('search-bar-input'), 'this is');

    await waitFor(() => {
      expect(screen.getByTestId('suggestion-dropdown')).toBeTruthy();
    });

    const suggestionItem = screen.getByTestId('suggestion-item-0');
    expect(suggestionItem).toBeTruthy();
    await userEvent.click(suggestionItem);

    expect(screen.queryByTestId('suggestion-dropdown')).toBeFalsy();
    expect(
      screen.getByTestId('search-bar-input').getAttribute('value')
    ).toEqual('this is a test string');
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });
});
