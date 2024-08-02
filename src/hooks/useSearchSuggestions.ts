import { useCallback, useState } from 'react';
import { useApi } from './useApi';
import { ApiRequestProps, ApiResponseProps } from '../types';
import { searchSuggestionsApi } from '../constants';
import { SearchSuggestionResponse } from '../types/SearchSuggestionsResponse';

interface SearchSuggestionsProps {
  searchText: string;
}

interface SearchSuggestionReturnProps
  extends Omit<ApiResponseProps<SearchSuggestionResponse>, 'sendRequest'> {
  searchSuggestions: (props: SearchSuggestionsProps) => Promise<void>;
}

export const useSearchSuggestions = (): SearchSuggestionReturnProps => {
  const {
    sendRequest,
    data: _,
    ...response
  } = useApi<SearchSuggestionResponse>();
  const [data, setData] = useState<SearchSuggestionResponse | undefined>(
    undefined
  ); //todo - set type

  const searchSuggestions = useCallback(
    async ({ searchText }: SearchSuggestionsProps) => {
      const request: ApiRequestProps = {
        url: searchSuggestionsApi.url,
        method: searchSuggestionsApi.method,
      };
      const data = await sendRequest(request);
      if (!data) {
        setData(data);
        return;
      }
      // todo - need to modify some values in the data to mock query response

      console.log(data); // todo - filter
      setData(data);
    },
    [sendRequest]
  );

  return {
    data,
    searchSuggestions,
    ...response,
  };
};
