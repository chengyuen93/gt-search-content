import { Link } from 'react-router-dom';
import { Huge } from '../../components';
import {
  BACK_TO_LOGIN,
  FLEX_1,
  FLEX_COL_CENTER,
  NOT_FOUND_404,
  PAGE,
  routes,
} from '../../constants';
import styles from './not-found-page.module.css';
import { PageWrapper } from '../page-wrapper';

export const NotFoundPage = () => {
  return (
    <PageWrapper>
      <div className={`${FLEX_1} ${FLEX_COL_CENTER} ${PAGE}`}>
        <Huge className={styles.text}>{NOT_FOUND_404}</Huge>
        <Link className={styles.link} to={routes.login}>
          {BACK_TO_LOGIN}
        </Link>
      </div>
    </PageWrapper>
  );
};
