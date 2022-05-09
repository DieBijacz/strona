import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext()

export function useConversations() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ id, children }) {
  // use localStorage to bring contacts if there are any and sets a new ones
  const [conversations, setConversations] = useLocalStorage('conversation', [])
  const [selectedConversation, setSelectedConversation] = useState(0)

  const { contacts } = useContacts()

  // CREATE CONVERSATION
  function createConversation(recipients) {
    // set it in local storage
    setConversations(prev => {
      return [...prev, { recipients, messages: [] }]
    })
  }

  // SEND MESSAGE sends from user and to user
  function addMessageToConversation({ recipients, text, sender }) {
    setConversations(prev => {
      let madeChange = false // will determinate if this is a new conversation
      const newMessage = { sender, text }

      // check if there is conversation with passed in recipients
      const newConversations = prev.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) { //checks if array of passed recipients is equal to any conversation
          madeChange = true
          return { ...conversation, messages: [...conversation.messages, newMessage] } // add new message to previous conversation
        }
        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        // if !madeChange then create new conversation with new message
        return [...prev, { recipients, messages: [newMessage] }]
      }
    })

  }

  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id })
  }

  // FORMAT CONTACTS in conversation so instead of just id will be {id, name}
  const formattedConversations = conversations.map((conversation, index) => {
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

    // returns true if selectedConversation index === index of that conversation
    const selected = index === selectedConversation

    // return conversations with formatted recipients
    return { ...conversation, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversation], //returns conversation based on index
    selectConversation: setSelectedConversation, //sets index
    createConversation,
    sendMessage
  }

  return (
    // provides contacts and function to create contact to all childrens
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  // check if every element in sortet arrays are same on same index
  return a.every((element, index) => {
    return element === b[index]
  })

}