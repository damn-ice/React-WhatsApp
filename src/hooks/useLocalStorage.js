import {useEffect, useState} from "react";


const PREFIX = 'whatsapp-clone-';
 
const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        // Function is used here so it will run only once...
        const jsonValue = localStorage.getItem(prefixedKey);
        // We used null because boolean of 0 is false and 0 can be the jsonValue...
        // I'm thinking next time i'll use bool jsonValue || 0
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        }else {
            return initialValue;
        }
    })
    // runs on each render and change of key and vaalue...
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}

export default useLocalStorage
