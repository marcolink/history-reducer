import { Reducer, useDebugValue, useReducer } from 'react';
import {
  HistoryAction,
  HistoryState,
  createHistoryReducer,
} from './reduceHistory';

function useHistoryReducer<T>(
  initialValue: T | null,
  maxSize = Number.MAX_SAFE_INTEGER
) {
  useDebugValue({ maxSize, initialValue: initialValue });
  return useReducer<Reducer<HistoryState<T>, HistoryAction<T>>>(
    createHistoryReducer({ maxSize }),
    {
      past: [],
      future: [],
      present: initialValue,
    }
  );
}

export { useHistoryReducer };
