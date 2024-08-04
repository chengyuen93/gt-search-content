import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../../context';
import { useContext } from 'react';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { isLogin, setLogin } = useContext(AuthContext);

  const handleClick = () => {
    setLogin(true);
  };

  return (
    <>
      <button data-testid="login-button" onClick={handleClick}>
        login
      </button>
      <span data-testid="status">isLogin: {isLogin.toString()}</span>
    </>
  );
};

describe('AuthContext', () => {
  afterEach(() => {
    cleanup();
  });

  it('should change state correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('isLogin: false');
    const button = screen.getByTestId('login-button');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('isLogin: true');
    });
  });
});
