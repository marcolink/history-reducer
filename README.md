# history-reducer
Dead simple react hook to create state history based on react useReducer. Developed to implement **undo**/**redo** shortcuts.

[![Version](https://img.shields.io/npm/v/history-reducer.svg)](https://npmjs.org/package/history-reducer)
[![Downloads/week](https://img.shields.io/npm/dw/history-reducer.svg)](https://npmjs.org/package/history-reducer)
[![License](https://img.shields.io/npm/l/history-reducer.svg)](https://github.com/marcolink/history-reducer/blob/master/package.json)
![Size](https://github.com/marcolink/history-reducer/workflows/size/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/marcolink/history-reducer/badge.svg?branch=master)](https://coveralls.io/github/marcolink/history-reducer?branch=master)

![](demo.gif)

## install
```
yarn add history-reducer
```
(TS declarations are shipped within this package)

## Usage

### Actions
| Action   | Description   |
|----------|-------------|
|`push`    |push new current state|
|`back`    |make the prev state the current, and push the current to the future stack|
|`forward` |if available, push the last future state to the current, and make the current the last past state|
|`reset`   |reset past and future state, and optional set a new current state|

### Hook

```js
const [{present, past, future}, dispatch] = useHistoryReducer(0, 5);
```
The hook `useHistoryReducer` returns the current state including `present`, `past` and `future` as the first argument, and a `dispatch` function as second. It accepts a default value as a first argument, and the max length for `past` and `future` as an optional second argument. 


## Example
#### Basic
```js
import {useHistoryReducer} from "history-reducer";

const HistoryReducerExample = () => {
    const [{present, past}, dispatch] = useHistoryReducer(0);
    return (
        <div>
            <p>Current value is {present}, but has been {past} before</p>
            <button onClick={() => dispatch({type:'push', state: Math.abs(Math.random() * 100)})}>add</button>
            <button onClick={() => dispatch({type: 'back'})}>back</button>
        </div>
    )
}
```

#### Basic TS 
```js
import {Action, useHistoryReducer} from "history-reducer";

const HistoryReducerExample = () => {
    const [{present, past}, dispatch] = useHistoryReducer<number>(0);
    return (
        <div>
            <p>Current value is {present}, but has been {past} before</p>
            <button onClick={() => dispatch({type:Action.PUSH, state: Math.abs(Math.random() * 100)})}>add</button>
            <button onClick={() => dispatch({type: Action.BACK})}>back</button>
        </div>
    )
}
```

Also check out the example [here](example).
