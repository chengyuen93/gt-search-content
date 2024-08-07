import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';

import { SearchBar, SearchResults } from '../../components';
import { PageWrapper } from '../page-wrapper';
import { AuthContext } from '../../context';
import { FLEX_1, FLEX_COL_LEFT_START, PAGE, routes } from '../../constants';
import { useSearchContent, useSearchSuggestions } from '../../hooks';

import styles from './search.module.css';

export const SearchPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);

  const {
    searchContent,
    data: content,
    isLoading: contentIsLoading,
    isFailed: contentIsFailed,
    isSuccessful: contentIsSuccessful,
  } = useSearchContent();
  const {
    searchSuggestions,
    data: suggestions,
    isLoading: suggestionsIsLoading,
    isFailed: suggestionsIsFailed,
    isSuccessful: suggestionsIsSuccessful,
  } = useSearchSuggestions();

  const handleSearch = useCallback(
    (searchText: string) => {
      searchContent({ searchText });
    },
    [searchContent]
  );

  const handleSuggest = useCallback(
    (searchText: string) => {
      searchSuggestions({ searchText });
    },
    [searchSuggestions]
  );

  useEffect(() => {
    if (isLogin) return;
    navigate(routes.login);
  }, [isLogin, navigate]);

  return (
    <PageWrapper>
      <div className={`${styles.search_bar_container} ${PAGE}`}>
        <SearchBar
          suggestionsIsLoading={suggestionsIsLoading}
          suggestionsIsFailed={suggestionsIsFailed}
          suggestionsIsSuccessful={suggestionsIsSuccessful}
          suggestions={suggestions}
          onSearch={handleSearch}
          onSuggest={handleSuggest}
        />
      </div>
      <div
        className={`${styles.search_result_container} ${PAGE} ${FLEX_1} ${FLEX_COL_LEFT_START}`}
      >
        <SearchResults
          content={content}
          isLoading={contentIsLoading}
          isFailed={contentIsFailed}
          isSuccessful={contentIsSuccessful}
        />
      </div>
    </PageWrapper>
  );
};
