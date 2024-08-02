import { HighlightableText } from './HighlightableText';

interface ResultItems {
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
  ResultItems: ResultItems[];
  TotalNumberOfResults: number;
}
