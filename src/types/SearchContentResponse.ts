import { HighlightableText } from './HighlightableText';

export interface ResultItem {
  DocumentExcerpt: HighlightableText;
  DocumentTitle: HighlightableText;
  DocumentId: string;
  DocumentURI: string;
  Id?: string;
  Type?: string;
}

export interface SearchContentResponse {
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
  TotalNumberOfResults: number;
}
