import { cleanup, render, screen } from '@testing-library/react';
import { Image } from '../../components';
import userEvent from '@testing-library/user-event';

const imageUrl =
  'https://fastly.picsum.photos/id/449/200/300.jpg?hmac=AswURfv1K7eMpuBVd_fnQVIDJrSBQeNmhwj13ofwljM';

describe('Image', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(<Image testId="testImage" url={imageUrl} />);

    const image = screen.getByTestId('testImage');
    expect(image).toBeTruthy();
    expect(screen.getByRole('img')).toBeTruthy();
    expect(image.getAttribute('height')).toBe('16');
    expect(image.getAttribute('width')).toBe('16');
    expect(image.getAttribute('src')).toBe(imageUrl);
  });

  it('should render size correctly', () => {
    render(<Image testId="testImage" height={20} width={22} url={imageUrl} />);

    const image = screen.getByTestId('testImage');
    expect(image).toBeTruthy();
    expect(image.getAttribute('height')).toBe('20');
    expect(image.getAttribute('width')).toBe('22');
  });

  it('should call onClick when clicked', async () => {
    const mockOnClick = jest.fn();
    render(<Image testId="testImage" url={imageUrl} onClick={mockOnClick} />);

    const image = screen.getByTestId('testImage');
    expect(image).toBeTruthy();
    await userEvent.click(image);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
