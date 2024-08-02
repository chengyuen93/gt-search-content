import { HTTPMethods } from '../types';

type RequestParams = {
  url: string;
  method: HTTPMethods;
};

export const searchContentApi: RequestParams = {
  url: 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json',
  method: HTTPMethods.GET,
};

export const searchSuggestionsApi: RequestParams = {
  url: 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json',
  method: HTTPMethods.GET,
};
