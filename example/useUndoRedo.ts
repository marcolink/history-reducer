import {useCallback, useEffect} from "react";
import {Action} from "../src";

const useUndoRedo = (dispatch) => {
    const back = useCallback(() => dispatch({type: Action.BACK}), [dispatch]);
    const forward = useCallback(() => dispatch({type: Action.FORWARD}), [dispatch]);

    const onKeyDown = useCallback(
        (event) => {
            const isModifierKey = event.metaKey || event.ctrlKey;
            const isZKey = event.keyCode === 90;
            if (isZKey && isModifierKey && event.shiftKey) {
                forward();
            } else if (isZKey && isModifierKey) {
                back();
            }
        },
        [back, forward]
    );

    useEffect(() => {
        const type = 'keydown';
        const target = window;
        target.addEventListener(type, onKeyDown);
        return () => target.removeEventListener(type, onKeyDown);
    }, []);
};

export {useUndoRedo}
