import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { SearchPage } from '../../pages';
import userEvent from '@testing-library/user-event';
import { mockQueryResults } from '../../__data__/queryResults';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useSearchContent: jest.fn(() => ({
    searchContent: jest.fn,
    data: mockQueryResults,
    isLoading: false,
    isFailed: false,
    isSuccessful: true,
  })),
  useSearchSuggestions: jest.fn(() => ({
    searchSuggestions: jest.fn,
    data: [],
    isLoading: false,
    isFailed: false,
    isSuccessful: false,
  })),
}));

describe('SearchPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should redirect to welcome page', () => {
    render(<SearchPage />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should render the search page correctly', () => {
    render(<SearchPage />);

    expect(screen.getByTestId('search-bar')).toBeTruthy();
    expect(screen.getByTestId('search-results')).toBeTruthy();
  });

  it('should display results on search', async () => {
    render(<SearchPage />);

    expect(screen.getByTestId('search-button')).toBeTruthy();
    await userEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getAllByTestId('result-item').length).not.toBe(0);
    });
  });
});
