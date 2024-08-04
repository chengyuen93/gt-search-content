import { cleanup, render, screen } from '@testing-library/react';
import { PageHeader } from '../../components';
import { OFFICIAL_TEXT, OFFICIAL_TEXT_BOLD } from '../../constants';

jest.mock('../../assets', () => ({
  SharedImages: {
    singapore_lion: 'singapore_lion',
  },
}));

describe('PageHeader', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const view = render(<PageHeader />);

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByRole('img').getAttribute('src')).toBe('singapore_lion');

    expect(view.baseElement).toHaveTextContent(OFFICIAL_TEXT);
    expect(screen.getByText(OFFICIAL_TEXT_BOLD)).toBeTruthy();
  });
});
