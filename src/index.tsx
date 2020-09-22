import { Reducer, useReducer } from 'react';
import { HistoryAction, HistoryState, reduce } from './reduceHistory';

function useHistoryReducer<T>(initialValue?: T) {
  return useReducer<Reducer<HistoryState<T>, HistoryAction<T>>>(reduce, {
    past: [],
    future: [],
    present: initialValue || null,
  });
}

export { useHistoryReducer };
