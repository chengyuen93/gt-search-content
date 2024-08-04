import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, Image } from '../../components';

const imageUrl =
  'https://fastly.picsum.photos/id/449/200/300.jpg?hmac=AswURfv1K7eMpuBVd_fnQVIDJrSBQeNmhwj13ofwljM';

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly with both icon and text', async () => {
    const icon = <Image testId="closeIcon" url={imageUrl} />;
    const onClick = jest.fn();
    render(<Button icon={icon} text={'Close'} onClick={onClick} />);

    expect(screen.getByTestId('closeIcon')).toBeTruthy();
    expect(screen.getByText('Close')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('button')).toHaveClass('with_icon');

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with just text', () => {
    render(<Button text={'Close'} onClick={jest.fn} />);

    expect(screen.getByText('Close')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('should render correctly with just icon', () => {
    const icon = <Image testId="closeIcon" url={imageUrl} />;

    render(<Button icon={icon} onClick={jest.fn} />);

    expect(screen.getByTestId('closeIcon')).toBeTruthy();
    expect(screen.queryByText('Close')).toBeFalsy();
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('button')).toHaveClass('icon_only');
  });

  it('should add classname correctly', () => {
    render(<Button text="Close" className="test-btn" onClick={jest.fn} />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('button')).toHaveClass('test-btn');
  });
});
