import {useState} from "react";

/**
 * Used like useState but will also persist to local storage
 * @param {*} key The key to store in local storage
 * @param {*} value The value to store with the key
 * @returns The stored value and a setter that will update both state and local storage
 */
function useLocalStorage(key, value) {
    // if no value check localstorage for a value
    if (!value)
        value = localStorage.getItem(key);
    const [storedValue, setStoredValue] = useState(value);

    const setValue = (value) => {
        setStoredValue(value);
        if (!value) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;