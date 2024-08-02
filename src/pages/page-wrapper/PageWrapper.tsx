import { PropsWithChildren } from 'react';
import { PageHeader } from '../../components';
import styles from './page-wrapper.module.css';

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PageHeader />
      <div className={styles.page}>{children}</div>
    </>
  );
};
