import { HTTPMethods } from './HTTPMethods';

export interface ApiRequestProps {
  url: string;
  method: HTTPMethods;
  params?: any;
}

export interface ApiResponseProps<T> {
  data: T | undefined;
  isLoading: boolean;
  isSuccessful: boolean;
  isFailed: boolean;
  error: any;
  sendRequest: (params: any) => Promise<T | undefined>;
}
