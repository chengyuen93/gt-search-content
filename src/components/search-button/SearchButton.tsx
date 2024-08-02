import { SharedImages } from '../../assets';
import { SEARCH } from '../../constants';
import { Button } from '../button';
import { Image } from '../image';

interface SearchButtonProps {
  isSmall?: boolean;
  className?: string;
  onClick: () => void;
}

export const SearchButton = ({
  className,
  isSmall,
  onClick,
}: SearchButtonProps) => {
  return (
    <Button
      className={className}
      icon={<Image height={26} width={26} url={SharedImages.search} />}
      text={isSmall ? '' : SEARCH}
      onClick={onClick}
    />
  );
};
