enum Action {
  PUSH = 'push',
  BACK = 'back',
  FORWARD = 'forward',
  RESET = 'reset',
}

export type HistoryState<T> = { past: T[]; future: T[]; present: T | null };
export type HistoryAction<T> =
  | { type: Action.PUSH; state: T }
  | { type: Action.BACK }
  | { type: Action.FORWARD }
  | { type: Action.RESET; state?: T };

export type HistoryReduce = <T>(
  prevState: HistoryState<T>,
  action: HistoryAction<T>
) => HistoryState<T>;

const createHistoryReducer = ({
  maxSize = Number.MAX_SAFE_INTEGER,
}): HistoryReduce => <T>(
  prevState: HistoryState<T>,
  action: HistoryAction<T>
): HistoryState<T> => {
  const { present, past, future } = prevState;
  const hasPast = past.length > 0;
  const hasFuture = future.length > 0;
  const hasPresent = present !== null;

  switch (action.type) {
    case Action.PUSH:
      return {
        present: action.state,
        past: hasPresent ? [...past.slice(-maxSize), present!] : past,
        future: [],
      };
    case Action.BACK:
      return {
        present: hasPast ? past[past.length - 1] : present,
        past: past.slice(0, past.length - 1),
        future:
          hasPresent && hasPast
            ? [...future.slice(0, maxSize), present!]
            : future,
      };
    case Action.FORWARD:
      return {
        present: hasFuture ? future[future.length - 1] : present,
        past:
          hasPresent && hasFuture ? [...past.slice(-maxSize), present!] : past,
        future: future.slice(0, future.length - 1),
      };
    case Action.RESET:
      return {
        present: action.state || null,
        past: [],
        future: [],
      };
    default:
      return prevState;
  }
};

export { createHistoryReducer, Action };
