import { useRef, useEffect } from 'react';

/**
 * Tracks the previous value of a variable.
 *
 * This is useful for comparing the previous value of some prop or state to the
 * current value, and taking action based on the change.
 */
function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export { usePrevious as u };
