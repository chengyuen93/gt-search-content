import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SearchButton } from '../search-button';
import styles from './search-bar.module.css';
import { Image } from '../image';
import { SharedImages } from '../../assets';
import fontStyles from '../fonts/fonts.module.css';
import { useDebouncedValue, useResponsive } from '../../hooks';
import {
  MIN_SHOW_CLEAR_BUTTON_TEXT_COUNT,
  MIN_SUGGESTION_TEXT_COUNT,
} from '../../constants/search';
import { HighlightableText } from '../../types';
import { Suggestions } from '../suggestions';

interface SearchBarProps {
  suggestions: HighlightableText[];
  onSearch: (searchText: string) => void;
  onSelected: () => void;
  onSuggest?: (searchText: string) => void;
}

export const SearchBar = ({
  suggestions,
  onSearch,
  onSelected,
  onSuggest,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const debouncedValue = useDebouncedValue({
    value: inputValue,
    defaultValue: '',
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

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
    setIsOpen(false); // todo - might not need this
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
    setTimeout(() => {
      setIsFocused(false);

      if (!inputRef.current) return;
      inputRef.current.blur();
    }, 200);
  };

  useEffect(() => {
    if (!onSuggest) return;

    onSuggest(debouncedValue);
  }, [debouncedValue, onSuggest]);

  useEffect(() => {
    setIsOpen(isFocused && inputValue.length >= MIN_SUGGESTION_TEXT_COUNT);

    // set `suggestions` as dependency because `setIsOpen` should be triggered when `suggestions` change
    // but whether it should be open depends on `inputValue.length` is more than a certain character length
    // but we do not want the fn to be trigger everytime `inputValue.length` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, suggestions]);

  return (
    <div className={searchBarClassName}>
      <div
        ref={inputContainerRef}
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
        {inputValue.length >= MIN_SHOW_CLEAR_BUTTON_TEXT_COUNT && (
          <Image
            className={styles.clear_button}
            height={28}
            width={28}
            url={SharedImages.close}
            onClick={handleClear}
          />
        )}
        {isOpen && (
          <Suggestions
            anchorEl={inputContainerRef.current}
            suggestions={suggestions}
          />
        )}
      </div>

      <SearchButton isSmall={isSmallScreen} onClick={handleSearch} />
    </div>
  );
};
