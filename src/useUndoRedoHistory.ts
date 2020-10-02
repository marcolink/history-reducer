import { useCallback, useEffect, useRef } from 'react';
import { Action, HistoryAction } from './index';

const useUndoRedoHistory = <T>(dispatch: (value: HistoryAction<T>) => void) => {
  const back = useCallback(() => dispatch({ type: Action.BACK }), [dispatch]);
  const forward = useCallback(() => dispatch({ type: Action.FORWARD }), [
    dispatch,
  ]);

  const onKeyDown = useCallback(
    event => {
      const isModifierKey = event.metaKey || event.ctrlKey;
      const isZKey = event.keyCode === 90;
      if (isZKey && isModifierKey && event.shiftKey) {
        forward();
      } else if (isZKey && isModifierKey) {
        back();
      }
    },
    [back, forward]
  );

  const ref = useRef(onKeyDown);

  useEffect(() => {
    const type = 'keydown';
    const target = window;
    if (ref) {
      target.removeEventListener(type, ref.current);
    }
    ref.current = onKeyDown;
    target.addEventListener(type, ref.current);
    return () => target.removeEventListener(type, ref.current);
  }, [onKeyDown]);
};

export { useUndoRedoHistory };
