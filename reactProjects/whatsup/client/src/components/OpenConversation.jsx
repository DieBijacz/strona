import React, { useState, useCallback } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationProvider'

const OpenConversation = () => {
  const [text, setText] = useState('')
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(selectedConversation.recipients.map(r => r.id), text)
    setText('')
  }

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className='d-flex flex-column align-start justify-content-end px-3'>
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div key={index} ref={lastMessage ? setRef : null} className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>{message.text}</div>
                <div className={`text-muted small ${message.fromMe ? 'text-end' : ''}`}>{message.fromMe ? 'You' : message.senderName}</div>
              </div>
            )
          })}

        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className='m-3'>
          <InputGroup>
            <Form.Control as='textarea' required autoFocus value={text} onChange={e => setText(e.target.value)} style={{ height: '75px', resize: 'none' }} />
            <Button type='submit'>Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  )
}

export default OpenConversation