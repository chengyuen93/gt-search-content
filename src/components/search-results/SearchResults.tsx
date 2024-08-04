import { PropsWithChildren, useMemo } from 'react';
import {
  CONTENT_FAILED,
  CONTENT_LOADING,
  MAX_SHOW_SEARCH_RESULT_COUNT,
  NO_CONTENT,
  RESULT_SUMMARY,
} from '../../constants';
import { ResultItem, SearchContentResponse } from '../../types';
import { H3, H6, MixedHighlightText, Text } from '../fonts';
import styles from './search-results.module.css';

interface ResultSummaryProps {
  from: number;
  to: number;
  total: number;
}

interface SearchResultsProps {
  isLoading: boolean;
  isFailed: boolean;
  isSucessful: boolean;
  content: SearchContentResponse | undefined;
}

interface ResultItemProps {
  resultItem: ResultItem;
}

const ResultSummary = ({ from, to, total }: ResultSummaryProps) => {
  return (
    <div className={styles.result_summary}>
      <H3 isBold>{RESULT_SUMMARY(from, to, total)}</H3>
    </div>
  );
};

const SearchResultItem = ({ resultItem }: ResultItemProps) => {
  const onLinkClick = () => window.open(resultItem.DocumentURI, '__tab__');

  return (
    <div className={styles.result_item}>
      <div className={styles.title_container}>
        <div className={styles.title_link_container} onClick={onLinkClick}>
          <H3 isBold className={styles.title}>
            {resultItem.DocumentTitle.Text}
          </H3>
        </div>
      </div>
      <div>
        <MixedHighlightText
          info={resultItem.DocumentExcerpt}
          RegularTextComponent={Text}
          HighlightedTextComponent={Text}
          highlightTextProps={{ isBold: true }}
        />
      </div>
      <div className={styles.link_container} onClick={onLinkClick}>
        <H6 className={styles.link}>{resultItem.DocumentURI}</H6>
      </div>
    </div>
  );
};

const ResultWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.search_result_container}>{children}</div>
);

export const SearchResults = ({
  content,
  isLoading,
  isFailed,
  isSucessful,
}: SearchResultsProps) => {
  const hasNoContent = useMemo(() => !content?.TotalNumberOfResults, [content]);
  const summaryData: ResultSummaryProps | undefined = useMemo(() => {
    if (!content) return;

    const from = (content.Page - 1) * MAX_SHOW_SEARCH_RESULT_COUNT + 1;
    const to = Math.min(
      from + MAX_SHOW_SEARCH_RESULT_COUNT - 1,
      content.TotalNumberOfResults
    );
    return {
      from,
      to,
      total: content.TotalNumberOfResults,
    };
  }, [content]);

  if (isLoading) {
    return (
      <ResultWrapper>
        <H3>{CONTENT_LOADING}</H3>
      </ResultWrapper>
    );
  }

  if (isFailed) {
    return (
      <ResultWrapper>
        <H3 isError>{CONTENT_FAILED}</H3>
      </ResultWrapper>
    );
  }

  if (isSucessful && hasNoContent) {
    return (
      <ResultWrapper>
        <H3>{NO_CONTENT}</H3>
      </ResultWrapper>
    );
  }

  return (
    <ResultWrapper>
      {summaryData && (
        <ResultSummary
          from={summaryData.from}
          to={summaryData.to}
          total={summaryData.total}
        />
      )}
      {content?.ResultItems.map((result) => (
        <SearchResultItem
          key={
            result.Id ? `${result.Id}-${result.DocumentId}` : result.DocumentId
          }
          resultItem={result}
        />
      ))}
    </ResultWrapper>
  );
};
