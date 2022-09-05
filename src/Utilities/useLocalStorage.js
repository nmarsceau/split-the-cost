import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const value = window.localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
    });

    return [
        value,
        _value => {
            if (_value instanceof Function) {_value = _value(value)}
            setValue(_value)
            window.localStorage.setItem(key, JSON.stringify(_value))
        }
    ]
}
