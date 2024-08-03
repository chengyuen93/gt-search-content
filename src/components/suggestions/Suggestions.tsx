import { useCallback, useMemo, useState } from 'react';
import { HighlightableText } from '../../types';
import styles from './suggestions.module.css';
import { H4, MixedHighlightText } from '../fonts';
import {
  NO_SUGGESTIONS,
  SUGGESTIONS_FAILED,
  SUGGESTIONS_LOADING,
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
} from '../../constants';

interface SuggestionsProps {
  isLoading: boolean;
  isFailed: boolean;
  anchorEl: HTMLDivElement | null;
  suggestions: HighlightableText[];
  onSelected: (selectedText: string) => void;
}

interface SuggestionItemProps {
  suggestion: HighlightableText;
  selectable: boolean;
  isHighLighted: boolean;
  isLoading: boolean;
  isError: boolean;
  index?: number;
  onClick?: (text: string) => void;
  onHover?: (index: number) => void;
}

const SuggestionItem = ({
  suggestion,
  selectable,
  isHighLighted,
  isLoading,
  isError,
  index,
  onHover,
  onClick,
}: SuggestionItemProps) => {
  const isSelectable = useMemo(
    () => selectable && !isLoading && !isError,
    [selectable, isLoading, isError]
  );

  const className = useMemo(() => {
    const cName = `${SUGGESTION_ITEM_CLASSNAME_IDENTIFIER} ${styles.suggestion_item}`;
    return isHighLighted && isSelectable
      ? `${cName} ${styles.suggestion_item_highlighted}`
      : `${cName} ${styles.suggestion_item_error}`;
  }, [isHighLighted, isSelectable]);

  const handleHover = useCallback(() => {
    onHover && typeof index === 'number' && onHover(index);
  }, [index, onHover]);

  const handleClick = useCallback(() => {
    onClick && onClick(suggestion.Text);
  }, [suggestion.Text, onClick]);

  return (
    <div
      tabIndex={-1}
      className={className}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      <MixedHighlightText
        info={suggestion}
        RegularTextComponent={H4}
        regularTextProps={
          isSelectable
            ? undefined
            : {
                className: isError
                  ? styles.suggestion_text_error
                  : styles.suggestion_text_disabled,
              }
        }
        HighlightedTextComponent={H4}
        highlightTextProps={{
          isBold: true,
          className: isSelectable
            ? undefined
            : isError
            ? styles.suggestion_text_error
            : styles.suggestion_text_disabled,
        }}
      />
    </div>
  );
};

export const Suggestions = ({
  anchorEl,
  suggestions,
  isLoading,
  isFailed,
  onSelected,
}: SuggestionsProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerStyles = useMemo(
    () => ({
      width: anchorEl?.offsetWidth,
      top: anchorEl ? anchorEl.offsetHeight + 1 : 0,
    }),
    [anchorEl]
  );

  const onHover = useCallback((index: number) => {
    setHighlightedIndex(index);
  }, []);

  const onSelect = useCallback(
    (text: string) => {
      onSelected(text);
    },
    [onSelected]
  );

  return (
    <div className={styles.suggestion_container} style={containerStyles}>
      {suggestions.length ? (
        suggestions.map((suggestion, index) => {
          const key =
            suggestion.Text.replace(' ', '') +
            suggestion.Highlights.reduce((prev, curr) => prev + curr, '-');
          return (
            <SuggestionItem
              key={key}
              index={index}
              suggestion={suggestion}
              selectable
              isHighLighted={index === highlightedIndex}
              isLoading={false}
              isError={false}
              onHover={onHover}
              onClick={onSelect}
            />
          );
        })
      ) : (
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: isLoading
              ? SUGGESTIONS_LOADING
              : isFailed
              ? SUGGESTIONS_FAILED
              : NO_SUGGESTIONS,
          }}
          selectable={false}
          isHighLighted={false}
          isLoading={isLoading}
          isError={isFailed}
        />
      )}
    </div>
  );
};
