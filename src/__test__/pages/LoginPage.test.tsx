import { cleanup, render, screen } from '@testing-library/react';
import { LoginPage } from '../../pages';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the login page correctly', () => {
    const view = render(<LoginPage />);

    expect(view.baseElement).toHaveTextContent('Hello, welcome!');
    expect(view.baseElement).toHaveTextContent(
      'Please click the button below to proceed :)'
    );
    expect(screen.getByText("Let's Go!")).toBeTruthy();
  });

  it('should navigate to search page', async () => {
    render(<LoginPage />);
    const button = screen.getByRole('button');
    expect(button).toBeTruthy();

    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });
});
