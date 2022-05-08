import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationProvider'

const Conversations = () => {
  const { conversations, selectConversation } = useConversations()

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index} action active={conversation.selected} onClick={() => selectConversation(index)}>
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup >
  )
}

export default Conversations