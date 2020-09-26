import {fireEvent, render} from '@testing-library/react'
import * as React from "react";
import {Action, useHistoryReducer} from "../src";

describe('A TestComponent with am useHistoryReducer', () => {
    it.skip('renders initial value as present state', () => {
        const {presentState} = renderTestComponent();
        expect(presentState.textContent).toBe('0');
    });
    it('renders pushed state', () => {
        const {presentState, pushButton} = renderTestComponent();
        fireEvent.click(pushButton);
        fireEvent.click(pushButton);
        expect(presentState.textContent).toBe('2');
    });
});

function renderTestComponent() {
    const {getByTestId} = render(<TestComponent/>)
    return {
        presentState: getByTestId('presentState'),
        pastState: getByTestId('pastState'),
        futureState: getByTestId('futureState'),
        pushButton: getByTestId('pushButton'),
        backButton: getByTestId('backButton'),
        forwardButton: getByTestId('forwardButton'),
        resetButton: getByTestId('resetButton'),
    }
}

function TestComponent() {
    const [{present, past, future}, dispatch] = useHistoryReducer<number>(0);

    return (
        <div>
            <p data-testid={'presentState'}>{present}</p>
            <p data-testid={'pastState'}>{past.join(', ')}</p>
            <p data-testid={'futureState'}>{future.join(', ')}</p>
            <button data-testid={'pushButton'}
                    onClick={() => dispatch({type: Action.PUSH, state: present ? present + 1 : 1})}>push
            </button>
            <button data-testid={'backButton'} onClick={() => dispatch({type: Action.BACK})}>back</button>
            <button data-testid={'forwardButton'} onClick={() => dispatch({type: Action.FORWARD})}>forward</button>
            <button data-testid={'resetButton'} onClick={() => dispatch({type: Action.RESET, state: 0})}>reset</button>
        </div>
    );
}
