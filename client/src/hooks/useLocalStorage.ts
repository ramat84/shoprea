import { useEffect, useState } from "react"

export const useLocalStorage = (key: string) => {
    const [value, setValue] = useState(() => {
        const rawValue = localStorage.getItem(key)
        return rawValue ? JSON.parse(rawValue) : null;
    })

    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
