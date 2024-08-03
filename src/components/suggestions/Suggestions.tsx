import { useCallback, useMemo, useState } from 'react';
import { HighlightableText } from '../../types';
import styles from './suggestions.module.css';
import { H4, MixedHighlightText } from '../fonts';
import {
  NO_SUGGESTIONS,
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
} from '../../constants';

interface SuggestionsProps {
  anchorEl: HTMLDivElement | null;
  suggestions: HighlightableText[];
  onSelected: (selectedText: string) => void;
}

interface SuggestionItemProps {
  suggestion: HighlightableText;
  selectable: boolean;
  isHighLighted: boolean;
  index?: number;
  onClick?: (text: string) => void;
  onHover?: (index: number) => void;
}

const SuggestionItem = ({
  suggestion,
  selectable,
  isHighLighted,
  index,
  onHover,
  onClick,
}: SuggestionItemProps) => {
  const className = useMemo(() => {
    const cName = `${SUGGESTION_ITEM_CLASSNAME_IDENTIFIER} ${styles.suggestion_item}`;
    return isHighLighted && selectable
      ? `${cName} ${styles.suggestion_item_highlighted}`
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

export const Suggestions = ({
  anchorEl,
  suggestions,
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
              onHover={onHover}
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
