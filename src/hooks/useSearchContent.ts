import { useCallback, useState } from 'react';
import { useApi } from './useApi';

import { searchContentApi } from '../constants';
import {
  ApiRequestProps,
  ApiResponseProps,
  SearchContentResponse,
} from '../types';

interface SearchContentProps {
  searchText: string;
}

interface SearchContentReturnProps
  extends Omit<ApiResponseProps<SearchContentResponse>, 'sendRequest'> {
  searchContent: (props: SearchContentProps) => Promise<void>;
}

export const useSearchContent = (): SearchContentReturnProps => {
  const { sendRequest, data: _, ...response } = useApi<SearchContentResponse>();
  const [data, setData] = useState<SearchContentResponse | undefined>(
    undefined
  ); //todo - set type

  const searchContent = useCallback(
    async ({ searchText }: SearchContentProps) => {
      const request: ApiRequestProps = {
        url: searchContentApi.url,
        method: searchContentApi.method,
      };
      const data = await sendRequest(request);
      // todo - need to modify some values in the data to mock query response
      console.log(data); // todo - filter
      // todo - if search text is "" or " ", then not need filter
      setData(data);
    },
    [sendRequest]
  );

  return {
    data,
    searchContent,
    ...response,
  };
};
