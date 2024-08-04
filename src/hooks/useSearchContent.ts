import { useCallback, useState } from 'react';

import { useApi } from './useApi';
import { MAX_SHOW_SEARCH_RESULT_COUNT, searchContentApi } from '../constants';
import {
  ApiRequestProps,
  ApiResponseProps,
  ResultItem,
  SearchContentResponse,
} from '../types';
import { filterTextContainMatch } from '../utils';

interface SearchContentProps {
  searchText: string;
}

interface SearchContentReturnProps
  extends Omit<ApiResponseProps<SearchContentResponse>, 'sendRequest'> {
  searchContent: (props: SearchContentProps) => Promise<void>;
}

/**
 * filter the given mocked query results which contain matches for the search text
 * @param resultItems
 * @param searchText
 * @returns
 */
const extractHighligtedContent = (
  resultItems: ResultItem[],
  searchText: string
): Pick<SearchContentResponse, 'ResultItems' | 'TotalNumberOfResults'> => {
  let totalCount = 0;
  let modifiedResultItems = [];
  for (const item of resultItems) {
    const { DocumentExcerpt, DocumentTitle } = item;
    const filteredDocumentExcerpt = filterTextContainMatch(
      [DocumentExcerpt.Text],
      searchText,
      true
    )[0];
    const filteredDocumentTitle = filterTextContainMatch(
      [DocumentTitle.Text],
      searchText,
      true
    )[0];

    if (filteredDocumentExcerpt || filteredDocumentTitle) {
      // any of the above is not undefined, means contains search text
      totalCount++;
      modifiedResultItems.push({
        ...item,
        DocumentExcerpt: filteredDocumentExcerpt ?? {
          Text: item.DocumentExcerpt.Text, // if filtered data is undefined, then we are only interested in the text
          Highlights: [],
        },
        DocumentTitle: filteredDocumentTitle ?? {
          Text: item.DocumentTitle.Text, // if filtered data is undefined, then we are only interested in the text
          Highlights: [],
        },
      });
    }
  }
  return {
    ResultItems: modifiedResultItems,
    TotalNumberOfResults: totalCount,
  };
};

export const useSearchContent = (): SearchContentReturnProps => {
  const { sendRequest, data: _, ...response } = useApi<SearchContentResponse>();
  const [data, setData] = useState<SearchContentResponse | undefined>(
    undefined
  );

  const searchContent = useCallback(
    async ({ searchText }: SearchContentProps) => {
      searchText = searchText.trim();

      const request: ApiRequestProps = {
        url: searchContentApi.url,
        method: searchContentApi.method,
      };
      const data = await sendRequest(request);
      if (!data) {
        setData(undefined);
        return;
      }
      if (!searchText) {
        // if no search text, assume returning all content
        setData(data);
        return;
      }
      // need to modify some values in the data to mock query response
      const { ResultItems } = data;

      const {
        ResultItems: modifiedResultItems,
        TotalNumberOfResults: totalCount,
      } = extractHighligtedContent(ResultItems, searchText);

      const modifiedData: SearchContentResponse = {
        Page: 1, // assume only showing page 1 since no pagination in figma
        PageSize: totalCount % MAX_SHOW_SEARCH_RESULT_COUNT,
        ResultItems: modifiedResultItems.slice(0, MAX_SHOW_SEARCH_RESULT_COUNT), // assume only showing max 10 results
        TotalNumberOfResults: totalCount,
      };
      setData(modifiedData);
    },
    [sendRequest]
  );

  return {
    data,
    searchContent,
    ...response,
  };
};
