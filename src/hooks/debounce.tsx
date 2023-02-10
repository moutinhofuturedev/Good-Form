import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
    const [ debounceValue, setDebounceValue ] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [delay, value])

    return debounceValue;
}

export default useDebounce;