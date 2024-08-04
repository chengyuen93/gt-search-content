import { cleanup, render, screen } from '@testing-library/react';
import { SearchResults, Suggestions } from '../../components';
import userEvent from '@testing-library/user-event';
import { mockQueryResults } from '../../__data__/queryResults';

describe('SearchResults', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly when it is loading', () => {
    const view = render(
      <SearchResults
        isLoading
        isFailed={false}
        isSuccessful={false}
        content={undefined}
      />
    );

    expect(screen.getByTestId('search-results')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('Loading ..');
  });

  it('should render correctly when it is failed to retrieve data', () => {
    const view = render(
      <SearchResults
        isLoading={false}
        isFailed
        isSuccessful={false}
        content={undefined}
      />
    );

    expect(screen.getByTestId('search-results')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('Error loading search results.');
  });

  it('should render correctly when it is successful to retrieve data but there is not data', () => {
    const view = render(
      <SearchResults
        isLoading={false}
        isFailed={false}
        isSuccessful
        content={undefined}
      />
    );

    expect(screen.getByTestId('search-results')).toBeTruthy();
    expect(view.baseElement).toHaveTextContent('No search results.');
  });

  it('should render correctly when it is successful to retrieve data and there is data', () => {
    const view = render(
      <SearchResults
        isLoading={false}
        isFailed={false}
        isSuccessful
        content={{
          Page: 2,
          PageSize: 10,
          TotalNumberOfResults: 30,
          ResultItems: mockQueryResults.ResultItems.slice(0, 30),
        }}
      />
    );

    expect(screen.getByTestId('search-results')).toBeTruthy();
    expect(screen.getAllByTestId('result-item').length).toBe(10);
    expect(view.baseElement).toHaveTextContent('Showing 11-20 of 30 results');
  });
});
