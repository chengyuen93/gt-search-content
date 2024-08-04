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
import { Image } from '../image';
import { SharedImages } from '../../assets';
import { useDebouncedValue, useResponsive } from '../../hooks';
import { HighlightableText } from '../../types';
import { Suggestions } from '../suggestions';
import {
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
  MIN_SHOW_CLEAR_BUTTON_TEXT_COUNT,
  MIN_SUGGESTION_TEXT_COUNT,
  HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
  FLEX_ROW_CENTER,
} from '../../constants';

import styles from './search-bar.module.css';
import fontStyles from '../fonts/fonts.module.css';

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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

  const showSuggestions = useMemo(() => !!onSuggest, [onSuggest]);

  const searchBarClassName = useMemo(() => {
    let cName = `${styles.search_bar} ${FLEX_ROW_CENTER}`;
    if (isFocused) cName += ` ${styles.search_bar_focused}`;
    if (isOpen) cName += ` ${styles.search_bar_opened}`;

    return cName;
  }, [isFocused, isOpen]);

  // use debounced input value so that the suggestions api is not called
  // every time the user types something
  const debouncedValue = useDebouncedValue({
    value: inputValue,
    defaultValue: '',
  });

  const { isXsScreen } = useResponsive();

  const handleSearch = useCallback(
    (text?: string) => {
      onSearch(text ?? inputValue);
      handleBlurInput();
    },
    [onSearch, inputValue]
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
    // add this check so that we know that what is being clicked on
    // so that the when the suggestions are clicked on, the dropdown
    // will not closed before the click is registered
    if (
      !e.relatedTarget?.classList.contains(SUGGESTION_ITEM_CLASSNAME_IDENTIFIER)
    ) {
      setIsFocused(false);
    }
  };

  // ===== only when suggestion feature is used
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
  // =====

  useEffect(() => {
    if (!onSuggest) return;

    // call the suggest api when debounced value changes instead of the input value
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
    // but we do not want the fn to be trigger everytime `inputValue.length` changes, whereby there is a gap
    // between input changes and suggestions changes due to api call, there might be a split second showing wrong data

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, suggestions, showSuggestions]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key !== 'Enter' ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      // to identify that there is a suggestion being selected, the selection event will be handled by the suggestion dropdown
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
        className={`${styles.search_bar_input_container} ${FLEX_ROW_CENTER}`}
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
