# react-history
Dead simple react hook to create state history based on react useReducer. 

## Example
```js
import {useHistoryReducer} from "react-history";

const Example = () => {
    const [{present, past}, dispatch] = useHistoryReducer(0);
    return (
        <div>
            <p>Current value is {present}, but has been {past} before</p>
            <button onClick={() => dispatch({type:'push', state: present + 1})}>add</button>
            <button onClick={() => dispatch({type: Operation.BACK})}>back</button>
            <button onClick={() => dispatch({type: Operation.FORWARD})}>forward</button>
            <button onClick={() => dispatch({type: Operation.RESET, state: 0})}>reset</button>
        </div>
    )
}
```

Also check out the example [here](example).
