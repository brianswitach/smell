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

  return useCallback(
    ((...args) => ref.current(...args)) as T,
    []
  );
}

// Add the polyfill to React if it doesn't exist
if (typeof window !== 'undefined' && typeof (window as any).React !== 'undefined') {
  const React = (window as any).React;
  if (!React.useEffectEvent) {
    React.useEffectEvent = useEffectEvent;
  }
} 