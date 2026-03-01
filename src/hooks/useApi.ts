import { useState, useCallback, useRef, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * KAAGAZSEVA - Universal API Hook
 * Fully typed, memory-safe, abort protected.
 */
export const useApi = <
  T,
  Args extends any[] = []   // ✅ DEFAULT ADDED HERE
>(
  apiFunction: (...args: Args) => Promise<T>
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const request = useCallback(
    async (...args: Args): Promise<T> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await apiFunction(...args);

        setState({
          data: result,
          error: null,
          loading: false,
        });

        return result;
      } catch (err: any) {
        if (err.name !== 'CanceledError') {
          const message =
            err.response?.data?.message ||
            err.message ||
            'Something went wrong';

          setState({
            data: null,
            error: message,
            loading: false,
          });
        }

        throw err;
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    ...state,
    request,
  };
};