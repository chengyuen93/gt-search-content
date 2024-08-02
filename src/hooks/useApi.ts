import { useCallback, useState } from 'react';
import { ApiRequestProps, ApiResponseProps, HTTPMethods } from '../types';

export const useApi = <T>(): ApiResponseProps<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = useCallback(
    async ({ url, method, params }: ApiRequestProps) => {
      const urlSearchParams =
        method === HTTPMethods.GET
          ? new URLSearchParams(params).toString()
          : undefined;

      url = urlSearchParams ? `${url}?${urlSearchParams}` : url;

      const request = new Request(url, {
        method,
        body: method === HTTPMethods.GET ? undefined : JSON.stringify(params),
      });

      setIsLoading(true);

      try {
        const response = await fetch(request);
        setIsFailed(false);
        setIsSuccessful(true);
        setData(response as T | undefined);
        setIsLoading(false);
        return response.json();
      } catch (e) {
        console.error(e);
        setIsFailed(true);
        setIsSuccessful(false);
        setError(e);
        setIsLoading(false);
        return undefined;
      }
    },
    []
  );

  return {
    data,
    isLoading,
    isSuccessful,
    isFailed,
    error,
    sendRequest,
  };
};
