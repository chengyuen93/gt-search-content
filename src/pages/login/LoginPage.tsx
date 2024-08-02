import { useCallback, useContext } from 'react';
import { Button, H3 } from '../../components';
import { HELLO_MESSAGE, LOGIN, routes } from '../../constants';
import { PageWrapper } from '../page-wrapper';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setLogin } = useContext(AuthContext);
  const handleLogin = useCallback(() => {
    setLogin(true);
    navigate(routes.search_page);
  }, [navigate, setLogin]);

  return (
    <PageWrapper>
      <H3 className={styles.text}>{HELLO_MESSAGE}</H3>
      <Button className={styles.button} text={LOGIN} onClick={handleLogin} />
    </PageWrapper>
  );
};
