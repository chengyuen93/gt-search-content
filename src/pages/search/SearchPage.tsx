import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../page-wrapper';
import { useCallback, useContext, useEffect } from 'react';

import { SearchBar } from '../../components';
import { AuthContext } from '../../context';
import { routes } from '../../constants';
import { useSearchContent, useSearchSuggestions } from '../../hooks';

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
      <SearchBar
        suggestions={suggestions}
        onSearch={handleSearch}
        onSelected={handleSelected}
        onSuggest={handleSuggest}
      />
    </PageWrapper>
  );
};
