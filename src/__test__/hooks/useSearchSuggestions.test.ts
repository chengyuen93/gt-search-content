import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { mockSuggestions } from '../../__data__/suggestion';
import { useSearchSuggestions } from '../../hooks';
import { useApi } from '../../hooks/useApi';
import { act } from 'react';

jest.mock('../../hooks/useApi', () => ({
  useApi: jest.fn(),
}));

describe('useSearchSuggestions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should return relevant suggestions based on search text', async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      isFailed: false,
      isSuccessful: true,
      isLoading: false,
      error: null,
      sendRequest: jest.fn().mockResolvedValue(mockSuggestions),
    });
    const { result } = renderHook(() => useSearchSuggestions());

    result.current.searchSuggestions({ searchText: 'reg' });

    await waitFor(() => {
      expect(result.current.data.length).toBe(1);
    });

    act(() => {
      result.current.searchSuggestions({ searchText: 'child' });
    });

    await waitFor(() => {
      expect(result.current.data.length).toBe(6);
    });

    act(() => {
      result.current.searchSuggestions({ searchText: 'ch' });
    });

    await waitFor(() => {
      expect(result.current.data.length).toBe(0);
    });
  });

  it('should not return suggestions if request failed', async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: undefined,
      isFailed: true,
      isSuccessful: false,
      isLoading: false,
      error: null,
      sendRequest: jest.fn().mockResolvedValue(undefined),
    });
    const { result } = renderHook(() => useSearchSuggestions());

    result.current.searchSuggestions({ searchText: 'reg' });

    await waitFor(() => {
      expect(result.current.data.length).toBe(0);
    });
  });
});
