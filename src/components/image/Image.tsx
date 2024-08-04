interface ImageProps {
  url: string;
  height?: number;
  width?: number;
  className?: string;
  testId?: string;
  onClick?: () => void;
}

export const Image = ({
  url,
  className,
  height = 16,
  width = 16,
  testId,
  onClick,
}: ImageProps) => {
  return (
    <img
      data-testid={testId}
      className={className}
      height={height}
      width={width}
      src={url}
      alt="not found"
      onClick={onClick}
    />
  );
};
