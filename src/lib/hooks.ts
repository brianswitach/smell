import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * A polyfill for React's useEffectEvent hook
 * This provides a stable function reference that can safely access the latest props and state
 */
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(
    (() => {
      throw new Error('Cannot call an event handler while rendering.');
    }) as unknown as T
  );

  useLayoutEffect(() => {
    ref.current = callback;
  });

  // Return a memoized function that delegates to the ref
  return useCallback(
    ((...args) => ref.current(...args)) as T,
    []
  );
}

// Make this the default export as well for compatibility
export default useEffectEvent; 