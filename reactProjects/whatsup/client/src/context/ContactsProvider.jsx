import React, { useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  // use localStorage to bring contacts if there are any and sets a new ones
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  // add new contact to local storage
  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }

  function deleteContact(index) {
    if (window.confirm('Do you want to delete this contact?')) {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contacts[index].id))
    }
  }

  return (
    // provides contacts and function to create contact to all childrens
    <ContactsContext.Provider value={{ contacts, createContact, deleteContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

