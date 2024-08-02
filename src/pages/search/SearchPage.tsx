import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../page-wrapper';
import { useCallback, useContext, useEffect } from 'react';

import { SearchBar } from '../../components';
import { AuthContext } from '../../context';
import { routes } from '../../constants';
import { useSearchContent } from '../../hooks';

export const SearchPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);

  const { searchContent, data } = useSearchContent();

  const handleSearch = useCallback(
    (searchText: string) => {
      searchContent({ searchText });
    },
    [searchContent]
  );

  const handleSelected = useCallback(() => {}, []);

  useEffect(() => {
    if (isLogin) return;
    navigate(routes.login);
  }, [isLogin, navigate]);

  console.log(data);
  return (
    <PageWrapper>
      <SearchBar
        suggestions={[]} //todo
        onSearch={handleSearch}
        onSelected={handleSelected}
      />
    </PageWrapper>
  );
};
