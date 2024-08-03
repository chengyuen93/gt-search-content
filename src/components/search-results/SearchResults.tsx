import { useMemo } from 'react';
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

export const SearchResults = ({
  content,
  isLoading,
  isFailed,
}: SearchResultsProps) => {
  const hasNoCotent = useMemo(() => !content?.TotalNumberOfResults, [content]);
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

  return (
    <div className={styles.search_result_container}>
      {isLoading && <H3>{CONTENT_LOADING}</H3>}
      {isFailed && <H3>{CONTENT_FAILED}</H3>}
      {hasNoCotent && <H3>{NO_CONTENT}</H3>}
      {summaryData && !hasNoCotent && !isFailed && !isLoading && (
        <>
          <ResultSummary
            from={summaryData.from}
            to={summaryData.to}
            total={summaryData.total}
          />
          {content?.ResultItems.map((result) => (
            <SearchResultItem
              key={
                result.Id
                  ? `${result.Id}-${result.DocumentId}`
                  : result.DocumentId
              }
              resultItem={result}
            />
          ))}
        </>
      )}
    </div>
  );
};
