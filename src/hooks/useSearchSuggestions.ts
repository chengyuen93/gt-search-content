import { useCallback, useState } from 'react';
import { useApi } from './useApi';
import {
  ApiRequestProps,
  ApiResponseProps,
  HighlightableText,
  SearchSuggestionResponse,
} from '../types';
import {
  searchSuggestionsApi,
  MIN_SUGGESTION_TEXT_COUNT,
  MAX_SUGGESTION_COUNT,
} from '../constants';
import { filterTextContainMatch } from '../utils';

interface SearchSuggestionsProps {
  searchText: string;
}

interface SearchSuggestionReturnProps
  extends Omit<
    ApiResponseProps<SearchSuggestionResponse>,
    'data' | 'sendRequest'
  > {
  data: HighlightableText[];
  searchSuggestions: (props: SearchSuggestionsProps) => Promise<void>;
}

export const useSearchSuggestions = (): SearchSuggestionReturnProps => {
  const {
    sendRequest,
    data: _,
    ...response
  } = useApi<SearchSuggestionResponse>();
  const [data, setData] = useState<HighlightableText[]>([]);

  const searchSuggestions = useCallback(
    async ({ searchText }: SearchSuggestionsProps) => {
      searchText = searchText.trim();
      if (searchText.length < MIN_SUGGESTION_TEXT_COUNT) {
        setData([]);
        return;
      }

      const request: ApiRequestProps = {
        url: searchSuggestionsApi.url,
        method: searchSuggestionsApi.method,
      };

      const data = await sendRequest(request);
      if (!data) {
        setData([]);
        return;
      }

      // need to modify some values in the data to mock query response
      const filteredSuggestions = filterTextContainMatch(
        data.suggestions,
        searchText
      );
      // display only the top 6 results
      setData(filteredSuggestions.slice(0, MAX_SUGGESTION_COUNT));
    },
    [sendRequest]
  );

  return {
    data,
    searchSuggestions,
    ...response,
  };
};
