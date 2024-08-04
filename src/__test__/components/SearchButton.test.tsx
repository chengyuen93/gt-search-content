import { cleanup, render, screen } from '@testing-library/react';
import { SearchButton } from '../../components';
import userEvent from '@testing-library/user-event';

jest.mock('../../assets', () => ({
  SharedImages: {
    search: 'search_icon',
  },
}));

describe('SearchButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(<SearchButton onClick={jest.fn} />);

    expect(screen.getByTestId('search-button')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
    const icon = screen.getByRole('img');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('src')).toBe('search_icon');
  });

  it('should render without text when small', () => {
    render(<SearchButton isSmall onClick={jest.fn} />);

    expect(screen.getByTestId('search-button')).toBeTruthy();
    expect(screen.queryByText('Search')).toBeFalsy();
    const icon = screen.getByRole('img');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('src')).toBe('search_icon');
  });

  it('should call onClick when clicked', async () => {
    const mockOnClick = jest.fn();
    render(<SearchButton onClick={mockOnClick} />);

    await userEvent.click(screen.getByTestId('search-button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
