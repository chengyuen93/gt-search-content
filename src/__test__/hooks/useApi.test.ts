import { cleanup, renderHook } from '@testing-library/react';
import { useApi } from '../../hooks/useApi';
import { mockSuggestions } from '../../__data__/suggestion';
import { act } from 'react';
import { HTTPMethods } from '../../types';

const unmockedFetch = global.fetch;
const unmockedRequest = global.Request;

describe('useApi', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockSuggestions),
      } as Response)
    );
    global.Request = jest.fn();
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
    global.Request = unmockedRequest;
  });

  afterEach(() => {
    cleanup();
  });

  it('request should be called with the correct params', async () => {
    const { result } = renderHook(() => useApi());
    const { sendRequest } = result.current;
    await act(async () => {
      await sendRequest({
        url: '/test-url',
        method: HTTPMethods.GET,
        params: { searchText: 'test' },
      });
      expect(Request).toHaveBeenCalledWith('/test-url?searchText=test', {
        body: undefined,
        method: 'GET',
      });
    });
    await act(async () => {
      await sendRequest({
        url: '/test-url',
        method: HTTPMethods.POST,
        params: { searchText: 'test' },
      });
      expect(Request).toHaveBeenCalledWith('/test-url', {
        body: JSON.stringify({ searchText: 'test' }),
        method: 'POST',
      });
    });
  });

  it('should return the correct data', async () => {
    const { result } = renderHook(() => useApi());
    const { sendRequest } = result.current;

    await act(async () => {
      const data = await sendRequest({ params: { searchText: 'test' } });
      expect(data).toStrictEqual(mockSuggestions);
    });
  });
});
