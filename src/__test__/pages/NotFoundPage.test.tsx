import { cleanup, render, screen } from '@testing-library/react';
import { NotFoundPage } from '../../pages';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';

interface MockLinkProps extends PropsWithChildren {
  className: string;
  to: string;
}

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  Link: ({ className, to, children }: MockLinkProps) => (
    <div className={className} onClick={() => mockNavigate(to)}>
      {children}
    </div>
  ),
}));

describe('NotFoundPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the not found page correctly', () => {
    const view = render(<NotFoundPage />);

    expect(view.baseElement).toHaveTextContent('Uh-oh!');
    expect(view.baseElement).toHaveTextContent('Are you lost?');
    expect(screen.getByText('Back to the Welcome page')).toBeTruthy();
  });

  it('should navigate to welcome page', async () => {
    render(<NotFoundPage />);
    const button = screen.getByText('Back to the Welcome page');
    expect(button).toBeTruthy();

    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
