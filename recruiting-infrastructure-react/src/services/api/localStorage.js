export const loadState = (stateKey) => {
    try {
        const serializedState = localStorage.getItem(stateKey);
        if (!serializedState) return undefined;
        else return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (stateKey, stateValue) => {
    try {
        const serializedState = JSON.stringify(stateValue);
        localStorage.setItem(stateKey, serializedState);
    } catch (err) {
        console.log(err);
    }
};