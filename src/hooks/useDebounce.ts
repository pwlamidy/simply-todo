import { useEffect, useState } from 'react'

export function useDebounce(value?: string, wait = 200) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, wait)
    return () => clearTimeout(timer)
  }, [value, wait])

  return debounceValue
}
