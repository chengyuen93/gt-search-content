import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
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
import { HighlightableText } from '../../types';
import { Suggestions } from '../suggestions';
import {
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
  MIN_SHOW_CLEAR_BUTTON_TEXT_COUNT,
  MIN_SUGGESTION_TEXT_COUNT,
  HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
} from '../../constants';

interface SearchBarProps {
  suggestions?: HighlightableText[];
  suggestionsIsLoading?: boolean;
  suggestionsIsFailed?: boolean;
  suggestionsIsSuccessful?: boolean;
  onSelected?: () => void;
  onSuggest?: (searchText: string) => void;
  onSearch: (searchText: string) => void;
}

export const SearchBar = ({
  suggestionsIsLoading = false,
  suggestionsIsFailed = false,
  suggestionsIsSuccessful = false,
  suggestions = [],
  onSuggest,
  onSearch,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showSuggestions = useMemo(() => !!onSuggest, [onSuggest]);

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

  const { isXsScreen } = useResponsive();

  const handleSearch = useCallback(
    (text?: string) => {
      onSearch(text ?? inputValue);
      handleBlurInput();
    },
    [onSearch, inputValue]
  );

  const handleSelected = useCallback(
    (selectedText: string) => {
      setIsOpen(false);
      setInputValue(selectedText);
      setTimeout(() => {
        handleSearch(selectedText);
      }, 10);
    },
    [handleSearch]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);
  };

  const handleFocusInput = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  const handleBlurInput = () => {
    if (!inputRef.current) return;

    inputRef.current.blur();
  };

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (
      !e.relatedTarget?.classList.contains(SUGGESTION_ITEM_CLASSNAME_IDENTIFIER)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (!onSuggest) return;

    onSuggest(debouncedValue);
  }, [debouncedValue, onSuggest]);

  useEffect(() => {
    setIsOpen(
      showSuggestions &&
        isFocused &&
        inputValue.length >= MIN_SUGGESTION_TEXT_COUNT
    );

    // set `suggestions` as dependency because `setIsOpen` should be triggered when `suggestions` change
    // but whether it should be open depends on `inputValue.length` is more than a certain character length
    // but we do not want the fn to be trigger everytime `inputValue.length` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, suggestions, showSuggestions]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key !== 'Enter' ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      !!document.getElementsByClassName(
        HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER
      ).length
    )
      return;

    handleSearch();
  };

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
          onKeyDown={handleKeyDown}
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
            isLoading={suggestionsIsLoading}
            isFailed={suggestionsIsFailed}
            isSuccessful={suggestionsIsSuccessful}
            onSelected={handleSelected}
          />
        )}
      </div>

      <SearchButton isSmall={isXsScreen} onClick={() => handleSearch()} />
    </div>
  );
};
