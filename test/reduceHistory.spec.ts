import { createHistoryReducer, HistoryReduce, Operation } from '../src';

describe('A history reduce function', () => {
  let reduce: HistoryReduce;

  beforeAll(() => {
    reduce = createHistoryReducer({});
  });

  it('can push a new state', () => {
    const result = reduce(
      { present: null, past: [], future: [] },
      { type: Operation.PUSH, state: 0 }
    );
    expect(result).toEqual({ present: 0, past: [], future: [] });
  });
  it('can push new state and generate past state', () => {
    const result = reduce(
      { present: 1, past: [3, 2], future: [] },
      { type: Operation.PUSH, state: 0 }
    );
    expect(result).toEqual({ present: 0, past: [3, 2, 1], future: [] });
  });
  it('can walk history back', () => {
    const result = reduce(
      { present: 1, past: [3, 2], future: [] },
      { type: Operation.BACK }
    );
    expect(result).toEqual({ present: 2, past: [3], future: [1] });
  });
  it('can walk history back and stop at initial state', () => {
    const result = reduce(
      { present: 1, past: [], future: [2] },
      { type: Operation.BACK }
    );
    expect(result).toEqual({ present: 1, past: [], future: [2] });
  });
  it('can walk history forward', () => {
    const result = reduce(
      { present: 1, past: [], future: [3, 2] },
      { type: Operation.FORWARD }
    );
    expect(result).toEqual({ present: 2, past: [1], future: [3] });
  });
  it('can walk history forward and stop at initial state', () => {
    const result = reduce(
      { present: 1, past: [3], future: [] },
      { type: Operation.FORWARD }
    );
    expect(result).toEqual({ present: 1, past: [3], future: [] });
  });
});
