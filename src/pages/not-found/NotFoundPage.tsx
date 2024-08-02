import { Link } from 'react-router-dom';
import { Huge } from '../../components';
import { BACK_TO_LOGIN, NOT_FOUND_404, routes } from '../../constants';
import styles from './not-found-page.module.css';
import { PageWrapper } from '../page-wrapper';

export const NotFoundPage = () => {
  return (
    <PageWrapper>
      <Huge className={styles.text}>{NOT_FOUND_404}</Huge>
      <Link className={styles.link} to={routes.login}>
        {BACK_TO_LOGIN}
      </Link>
    </PageWrapper>
  );
};
