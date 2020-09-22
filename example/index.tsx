import 'react-app-polyfill/ie11';
import {useCallback, useState} from "react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useHistoryReducer} from "../.";
import {Operation} from "../src/reduceHistory";

const App = () => {
    const [{present, past, future}, dispatch] = useHistoryReducer<Number>(0);
    const [localCounter, setLocalCounter] = useState(0);

    const increaseLocalState = useCallback(() => {
        setLocalCounter(prevState => {
            dispatch({type: Operation.PUSH, state: prevState + 1});
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
            <button onClick={() => dispatch({type: Operation.BACK})}>back</button>
            <button onClick={() => dispatch({type: Operation.FORWARD})}>forward</button>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
