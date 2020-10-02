import * as React from "react";
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import {Action, useHistoryReducer} from "../src";
import {useUndoRedoHistory} from "../src/useUndoRedoHistory";

const App = () => {
    const [{present, past, future}, dispatch] = useHistoryReducer<number>(0, 5);

    useUndoRedoHistory(dispatch);

    return (
        <div>
            <p><strong>PRESENT:</strong> {present}</p>
            <p><strong>PAST:</strong> {past.join(', ')}</p>
            <p><strong>FUTURE:</strong> {future.join(', ')}</p>
            <button onClick={() => dispatch({type: Action.PUSH, state: Math.floor(Math.random() * 100)})}>push</button>
            <button onClick={() => dispatch({type: Action.BACK})}>back</button>
            <button onClick={() => dispatch({type: Action.FORWARD})}>forward</button>
            <button onClick={() => dispatch({type: Action.RESET, state: 0})}>reset</button>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
