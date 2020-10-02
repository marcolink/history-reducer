import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Action, useHistoryReducer } from '../src';
import { useUndoRedoHistory } from '../src/useUndoRedoHistory';

describe('A TestComponent with am useHistoryReducer and useUndoRedoHistory hook', () => {
  it('undo history with cmd + z', () => {
    const { presentState, pushButton } = renderTestComponent();
    fireEvent.click(pushButton);
    expect(presentState.textContent).toBe('1');
    fireEvent.keyDown(window, { metaKey: true, keyCode: 90 });
    expect(presentState.textContent).toBe('0');
  });
  it('redo history with cmd + shift + z', () => {
    const { presentState, pushButton } = renderTestComponent();
    fireEvent.click(pushButton);
    expect(presentState.textContent).toBe('1');
    fireEvent.keyDown(window, { metaKey: true, keyCode: 90 });
    expect(presentState.textContent).toBe('0');
    fireEvent.keyDown(window, { metaKey: true, shiftKey: true, keyCode: 90 });
    expect(presentState.textContent).toBe('1');
  });
});

function renderTestComponent() {
  const { getByTestId } = render(<TestComponent />);
  return {
    presentState: getByTestId('presentState'),
    pastState: getByTestId('pastState'),
    futureState: getByTestId('futureState'),
    pushButton: getByTestId('pushButton'),
  };
}

function TestComponent() {
  const [{ present, past, future }, dispatch] = useHistoryReducer<number>(0);
  useUndoRedoHistory(dispatch);

  return (
    <div>
      <p data-testid={'presentState'}>{present}</p>
      <p data-testid={'pastState'}>{past.join(', ')}</p>
      <p data-testid={'futureState'}>{future.join(', ')}</p>
      <button
        data-testid={'pushButton'}
        onClick={() =>
          dispatch({ type: Action.PUSH, state: present ? present + 1 : 1 })
        }
      >
        push
      </button>
    </div>
  );
}
