import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationContext = React.createContext()

export function useConversation() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ children }) {
  // use localStorage to bring contacts if there are any and sets a new ones
  const [conversation, setConversation] = useLocalStorage('conversation', [])

  // add new contact to local storage
  function createConversation(recipients) {
    setConversation(prev => {
      return [...prev, { recipients, messages: [] }]
    })
  }

  return (
    // provides contacts and function to create contact to all childrens
    <ConversationContext.Provider value={{ conversation, createConversation }}>
      {children}
    </ConversationContext.Provider>
  )
}

