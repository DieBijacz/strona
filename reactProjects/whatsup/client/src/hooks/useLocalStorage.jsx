import { useEffect, useState } from "react"
// HOOK TO SAVE STATE WITH PREFIX IN LOCAL STORAGE
// AND BRING STATE WITH THAT PREFIX

const PREFIX = 'whatsapp-clone-'

const useLocalStorage = (key, initailValue) => {
  const prefixedKey = PREFIX + key //create prefixedKey so it doesn't mix in localStorage

  // as initial value check localStorage if there is anything with prefixedKey
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initailValue === 'funciton') {
      return initailValue()
    } else {
      return initailValue
    }
  })

  // saves value with prefixedKey, whenever that changes
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [value, prefixedKey])

  return [value, setValue]
}

export default useLocalStorage