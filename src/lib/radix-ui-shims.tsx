// This file serves as a direct replacement for @radix-ui/react-use-effect-event
import { useCallback, useLayoutEffect, useRef } from 'react';

// Mimics the Radix UI useEffectEvent implementation
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

// Export everything that the original module exports
export default useEffectEvent; 