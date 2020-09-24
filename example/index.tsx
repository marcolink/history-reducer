import * as React from "react";
import {useCallback, useState} from "react";
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import {Action, useHistoryReducer} from "../src";

const App = () => {
    const [{present, past, future}, dispatch] = useHistoryReducer<Number>(0, 5);
    const [localCounter, setLocalCounter] = useState(0);

    const increaseLocalState = useCallback(() => {
        setLocalCounter(prevState => {
            dispatch({type: Action.PUSH, state: prevState + 1});
            return prevState + 1;
        })
    }, [dispatch]);

    return (
        <div>
            <p><strong>LOCAL:</strong> {localCounter}</p>
            <p><strong>PRESENT:</strong> {present}</p>
            <p><strong>PAST:</strong> {past.join(', ')}</p>
            <p><strong>FUTURE:</strong> {future.join(', ')}</p>
            <button onClick={increaseLocalState}>add</button>
            <button onClick={() => dispatch({type: Action.BACK})}>back</button>
            <button onClick={() => dispatch({type: Action.FORWARD})}>forward</button>
            <button onClick={() => dispatch({type: Action.RESET, state: 0})}>reset</button>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
