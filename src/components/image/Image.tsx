interface ImageProps {
  url: string;
  height?: number;
  width?: number;
  className?: string;
  onClick?: () => void;
}

export const Image = ({
  url,
  className,
  height = 16,
  width = 16,
  onClick,
}: ImageProps) => {
  return (
    <img
      className={className}
      height={height}
      width={width}
      src={url}
      alt="not found"
      onClick={onClick}
    />
  );
};
