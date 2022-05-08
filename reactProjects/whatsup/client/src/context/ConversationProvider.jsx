import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext()

export function useConversations() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ children }) {
  // use localStorage to bring contacts if there are any and sets a new ones
  const [conversations, setConversations] = useLocalStorage('conversation', [])
  const { contacts } = useContacts()

  // add new contact to local storage
  function createConversation(recipients) {
    setConversations(prev => {
      return [...prev, { recipients, messages: [] }]
    })
  }

  // format contacts in conversation so instead of just id will be {id, name}
  const formattedConversations = conversations.map(conversation => {
    // for each conversation and in recipient in them
    const recipients = conversation.recipients.map(recipient => {
      // find in contacts that user
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      // format and return user
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    // return conversations with formatted recipients
    return { ...conversation, recipients }
  })

  const value = {
    conversations: formattedConversations,
    createConversation
  }

  return (
    // provides contacts and function to create contact to all childrens
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}

