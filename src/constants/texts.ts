// page header
export const OFFICIAL_TEXT = 'An Official Website of the ';
export const OFFICIAL_TEXT_BOLD = 'Singapore Government';

// not found page
export const NOT_FOUND_404 = 'Uh-oh!\nAre you lost?';
export const BACK_TO_LOGIN = 'Back to the Welcome page';

// login page
export const HELLO_MESSAGE =
  'Hello, welcome!\nPlease click the button below to proceed :)';
export const LOGIN = "Let's Go!";

// search page
export const SEARCH = 'Search';
export const NO_SUGGESTIONS = 'No Suggestions.';
export const SUGGESTIONS_LOADING = 'Fetching ..';
export const SUGGESTIONS_FAILED = 'Failed to fetch suggestions.';
export const SUGGESTION_ITEM_CLASSNAME_IDENTIFIER = 'suggestion_item';
export const HIGHLIGHTED_SUGGESTION_ITEM_CLASSNAME_IDENTIFIER =
  'highlighted_suggestion_item';
export const RESULT_SUMMARY = (from: number, to: number, total: number) =>
  `Showing ${from}-${to} of ${total} result${total > 1 ? 's' : ''}`;
export const CONTENT_LOADING = 'Loading ..';
export const CONTENT_FAILED = 'Error loading search results.';
export const NO_CONTENT = 'No Search Results.';
