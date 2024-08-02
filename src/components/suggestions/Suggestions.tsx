import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { HighlightableText } from '../../types';
import styles from './suggestions.module.css';
import { H4, MixedHighlightText } from '../fonts';
import { NO_SUGGESTIONS } from '../../constants';

interface SuggestionsProps {
  anchorEl: HTMLDivElement | null;
  suggestions: HighlightableText[];
}

interface SuggestionItemProps {
  suggestion: HighlightableText;
  selectable: boolean;
  isHighLighted: boolean;
  onClick?: (e: MouseEvent) => void;
  onHover?: () => void;
}

const SuggestionItem = ({
  suggestion,
  selectable,
  isHighLighted,
  onHover,
  onClick,
}: SuggestionItemProps) => {
  const className = useMemo(() => {
    return isHighLighted && selectable
      ? `${styles.suggestion_item} ${styles.suggestion_item_highlighted}`
      : styles.suggestion_item;
  }, [isHighLighted, selectable]);

  return (
    <div className={className} onMouseEnter={onHover} onClick={onClick}>
      <MixedHighlightText
        info={suggestion}
        RegularTextComponent={H4}
        regularTextProps={
          selectable
            ? undefined
            : { className: styles.suggestion_text_disabled }
        }
        HighlightedTextComponent={H4}
        highlightTextProps={{
          isBold: true,
          className: selectable ? undefined : styles.suggestion_text_disabled,
        }}
      />
    </div>
  );
};

export const Suggestions = ({ anchorEl, suggestions }: SuggestionsProps) => {
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

  const onSelect = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

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
              suggestion={suggestion}
              selectable
              isHighLighted={index === highlightedIndex}
              onHover={() => onHover(index)}
              onClick={onSelect}
            />
          );
        })
      ) : (
        <SuggestionItem
          suggestion={{ Highlights: [], Text: NO_SUGGESTIONS }}
          selectable={false}
          isHighLighted={false}
        />
      )}
    </div>
  );
};
