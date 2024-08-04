import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { useSearchContent } from '../../hooks';
import { useApi } from '../../hooks/useApi';
import { act } from 'react';
import { mockQueryResults } from '../../__data__/queryResults';

jest.mock('../../hooks/useApi', () => ({
  useApi: jest.fn(),
}));

describe('useSearchContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should return relevant content based on search text', async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: mockQueryResults,
      isFailed: false,
      isSuccessful: true,
      isLoading: false,
      error: null,
      sendRequest: jest.fn().mockResolvedValue(mockQueryResults),
    });
    const { result } = renderHook(() => useSearchContent());

    result.current.searchContent({ searchText: 'partner' });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
    expect(result.current.data?.ResultItems.length).toBe(1);

    result.current.searchContent({ searchText: 'educa' });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
    expect(result.current.data?.ResultItems.length).toBe(4);

    result.current.searchContent({ searchText: 'reg' });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
    expect(result.current.data?.ResultItems.length).toBe(0);
  });

  it('should not return content if request failed', async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: undefined,
      isFailed: true,
      isSuccessful: false,
      isLoading: false,
      error: null,
      sendRequest: jest.fn().mockResolvedValue(undefined),
    });
    const { result } = renderHook(() => useSearchContent());

    result.current.searchContent({ searchText: 'reg' });

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });
  });
});
