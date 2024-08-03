import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../page-wrapper';
import { useCallback, useContext, useEffect } from 'react';

import { SearchBar } from '../../components';
import { AuthContext } from '../../context';
import { FLEX_1, FLEX_COL_LEFT_START, PAGE, routes } from '../../constants';
import { useSearchContent, useSearchSuggestions } from '../../hooks';
import styles from './search.module.css';

export const SearchPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);

  const { searchContent, data: content } = useSearchContent();
  const { searchSuggestions, data: suggestions } = useSearchSuggestions();

  const handleSearch = useCallback(
    (searchText: string) => {
      searchContent({ searchText });
    },
    [searchContent]
  );

  const handleSelected = useCallback(() => {}, []);

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
          suggestions={suggestions}
          onSearch={handleSearch}
          onSelected={handleSelected}
          onSuggest={handleSuggest}
        />
      </div>
      <div
        className={`${styles.search_result_container} ${PAGE} ${FLEX_1} ${FLEX_COL_LEFT_START}`}
      ></div>
    </PageWrapper>
  );
};
