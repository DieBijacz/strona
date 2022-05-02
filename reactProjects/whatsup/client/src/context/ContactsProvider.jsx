import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export const useContacts = () => {
  return useContext(ContactsContext)
}

export const ContactsProvider = ({ children }) => {
  // use localStorage to bring contacts if there are any and sets a new ones
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  // add new contact to local storage
  const createContact = (id, name) => {
    setContacts(prevContacts => [...prevContacts, { id, name }])
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

