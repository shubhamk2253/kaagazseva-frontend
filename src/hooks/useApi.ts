import { useState, useCallback, useRef, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * KAAGAZSEVA - Universal API Hook
 * Typed, abort-safe, reusable across the platform.
 */

export const useApi = <
  T,
  Args extends any[] = []
>(
  apiFunction: (...args: Args) => Promise<T>
) => {

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  //////////////////////////////////////////////////////
  // REQUEST FUNCTION
  //////////////////////////////////////////////////////

  const request = useCallback(
    async (...args: Args): Promise<T> => {

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setState((prev) => ({
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

        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {

          const message =
            err?.response?.data?.message ||
            err?.message ||
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

  //////////////////////////////////////////////////////
  // CLEANUP ON UNMOUNT
  //////////////////////////////////////////////////////

  useEffect(() => {

    return () => {
      abortControllerRef.current?.abort();
    };

  }, []);

  //////////////////////////////////////////////////////
  // RETURN
  //////////////////////////////////////////////////////

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    request,
  };

};