import { useCallback, useState } from 'react';
import { useApi } from './useApi';
import {
  ApiRequestProps,
  ApiResponseProps,
  HighlightableText,
  SearchSuggestionResponse,
} from '../types';
import { searchSuggestionsApi } from '../constants';
import { MIN_SUGGESTION_TEXT_COUNT } from '../constants/search';
import { filterPartialTextContainMatch } from '../utils';

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

      const filteredSuggestions = filterPartialTextContainMatch(
        data.suggestions,
        searchText
      );
      setData(filteredSuggestions);
    },
    [sendRequest]
  );

  return {
    data,
    searchSuggestions,
    ...response,
  };
};
