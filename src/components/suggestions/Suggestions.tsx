import {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { HighlightableText } from '../../types';
import { H4, MixedHighlightText } from '../fonts';
import {
  HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
  NO_SUGGESTIONS,
  SUGGESTIONS_FAILED,
  SUGGESTIONS_LOADING,
  SUGGESTION_ITEM_CLASSNAME_IDENTIFIER,
} from '../../constants';

import styles from './suggestions.module.css';

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

interface ContainerWrapperProps extends PropsWithChildren {
  style: CSSProperties;
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
    const cName = `${SUGGESTION_ITEM_CLASSNAME_IDENTIFIER} ${styles.suggestion_item}`; // used to identify a suggestion item
    if (isHighLighted && selectable)
      return `${cName} ${styles.suggestion_item_highlighted} ${HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER}`; // used to identify a highlighted suggestion item
    return cName;
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

const ContainerWrapper = ({ style, children }: ContainerWrapperProps) => (
  <div className={styles.suggestion_container} style={style}>
    {children}
  </div>
);

export const Suggestions = ({
  anchorEl,
  suggestions,
  isLoading,
  isFailed,
  isSuccessful,
  onSelected,
}: SuggestionsProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerStyles: CSSProperties = useMemo(
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
          switch (e.key) {
            case 'ArrowUp':
              return index <= 0 ? suggestions.length - 1 : index - 1;
            case 'ArrowDown':
              return index === -1 || index === suggestions.length - 1
                ? 0
                : index + 1;
            default:
              return index;
          }
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

  if (isLoading) {
    return (
      <ContainerWrapper style={containerStyles}>
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: SUGGESTIONS_LOADING,
          }}
        />
      </ContainerWrapper>
    );
  }

  if (isFailed) {
    return (
      <ContainerWrapper style={containerStyles}>
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: SUGGESTIONS_FAILED,
          }}
          isError
        />
      </ContainerWrapper>
    );
  }

  if (isSuccessful && !suggestions.length) {
    return (
      <ContainerWrapper style={containerStyles}>
        <SuggestionItem
          suggestion={{
            Highlights: [],
            Text: NO_SUGGESTIONS,
          }}
        />
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper style={containerStyles}>
      {suggestions.map((suggestion, index) => {
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
    </ContainerWrapper>
  );
};
