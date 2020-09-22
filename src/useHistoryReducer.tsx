import { Reducer, useReducer } from 'react';
import {
  HistoryAction,
  HistoryState,
  createHistoryReducer,
} from './reduceHistory';

function useHistoryReducer<T>(
  initialValue?: T,
  maxSize = Number.MAX_SAFE_INTEGER
) {
  return useReducer<Reducer<HistoryState<T>, HistoryAction<T>>>(
    createHistoryReducer({ maxSize }),
    {
      past: [],
      future: [],
      present: initialValue || null,
    }
  );
}

export { useHistoryReducer };
