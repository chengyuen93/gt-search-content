import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SearchButton } from '../search-button';
import styles from './search-bar.module.css';
import { Image } from '../image';
import { SharedImages } from '../../assets';
import fontStyles from '../fonts/fonts.module.css';
import { useResponsive } from '../../hooks';

interface SearchBarProps {
  suggestions: any[];
  onSearch: (searchText: string) => void;
  onSelected: () => void;
}

export const SearchBar = ({
  suggestions,
  onSearch,
  onSelected,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchBarClassName = useMemo(() => {
    let cName = styles.search_bar;
    if (isFocused) {
      cName = `${cName} ${styles.search_bar_focused}`;
    }
    if (isOpen) {
      cName = `${cName} ${styles.search_bar_opened}`;
    }
    return cName;
  }, [isFocused, isOpen]);

  const { isSmallScreen } = useResponsive();

  const handleSearch = useCallback(() => {
    onSearch(inputValue);
  }, [onSearch, inputValue]);

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);
  };

  const handleFocusInput = (e: MouseEvent) => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={searchBarClassName}>
      <div
        className={styles.search_bar_input_container}
        onClick={handleFocusInput}
      >
        <input
          ref={inputRef}
          value={inputValue}
          className={`${styles.search_bar_input} ${fontStyles.h4}`}
          type="text"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
        />
        {inputValue.length >= 1 && (
          <Image
            className={styles.clear_button}
            height={28}
            width={28}
            url={SharedImages.close}
            onClick={handleClear}
          />
        )}
      </div>

      <SearchButton isSmall={isSmallScreen} onClick={handleSearch} />
    </div>
  );
};
