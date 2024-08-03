import { PropsWithChildren } from 'react';
import { PageHeader } from '../../components';

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PageHeader />
      {children}
    </>
  );
};
