import { cleanup, render, screen } from '@testing-library/react';
import { Router } from '../../router/Router';

describe('Router', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the first page correctly', () => {
    const view = render(<Router />);

    expect(view.baseElement).toHaveTextContent('Hello, welcome!');
    expect(view.baseElement).toHaveTextContent(
      'Please click the button below to proceed :)'
    );
    expect(screen.getByText("Let's Go!")).toBeTruthy();
  });
});
