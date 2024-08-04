import { useCallback, useEffect, useMemo, useState } from 'react';
import { HighlightableText } from '../../types';
import styles from './suggestions.module.css';
import { H4, MixedHighlightText } from '../fonts';
import {
  HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
  NO_SUGGESTIONS,
  SUGGESTIONS_FAILED,
  SUGGESTIONS_LOADING,
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
} from '../../constants';

interface SuggestionsProps {
  isLoading: boolean;
  isFailed: boolean;
  isSuccessful: boolean;
  anchorEl: HTMLDivElement | null;
  suggestions: HighlightableText[];
  onSelected: (selectedText: string) => void;
}

interface SuggestionItemProps {
  suggestion: HighlightableText;
  selectable?: boolean;
  isHighLighted?: boolean;
  isError?: boolean;
  index?: number;
  onClick?: (text: string) => void;
  onHover?: (index: number) => void;
}

const SuggestionItem = ({
  suggestion,
  selectable,
  isHighLighted,
  isError,
  index,
  onHover,
  onClick,
}: SuggestionItemProps) => {
  const className = useMemo(() => {
    const cName = `${SUGGESTION_ITEM_CLASSNAME_IDENTIFIER} ${styles.suggestion_item}`;
    return isHighLighted && selectable
      ? `${cName} ${styles.suggestion_item_highlighted} ${HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER}`
      : cName;
  }, [isHighLighted, selectable]);

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
          selectable
            ? undefined
            : {
                className: styles.suggestion_text_disabled,
                isError: isError,
              }
        }
        HighlightedTextComponent={H4}
        highlightTextProps={{
          isBold: true,
          className: selectable ? undefined : styles.suggestion_text_disabled,
          isError: isError,
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
  isSuccessful,
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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      if (e.ctrlKey || e.altKey || e.shiftKey) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setHighlightedIndex((index) => {
          if (e.key === 'ArrowUp') {
            if (index === -1 || index === 0) return suggestions.length - 1;
            return index - 1;
          }
          if (e.key === 'ArrowDown') {
            if (index === -1 || index === suggestions.length - 1) return 0;
            return index + 1;
          }

          return index;
        });
        return;
      }

      if (e.key === 'Enter' && highlightedIndex !== -1) {
        onSelect(suggestions[highlightedIndex].Text);
      }
    },
    [suggestions, highlightedIndex, onSelect]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.suggestion_container} style={containerStyles}>
      {isLoading && (
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: SUGGESTIONS_LOADING,
          }}
        />
      )}
      {!isLoading && isFailed && (
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: SUGGESTIONS_FAILED,
          }}
          isError
        />
      )}
      {!isLoading &&
        isSuccessful &&
        !!suggestions.length &&
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
              onHover={onHover}
              onClick={onSelect}
            />
          );
        })}
      {!isLoading && isSuccessful && !suggestions.length && (
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: NO_SUGGESTIONS,
          }}
        />
      )}
    </div>
  );
};
