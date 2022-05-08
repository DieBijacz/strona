import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationProvider'

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const [selectedContactIds, setSelectedContactIds] = useState([])

  // array of selected contacts for new conversation
  function handleCheckboxChange(id) {
    // if there is passed contact id already in state then remove it, else add it
    setSelectedContactIds(prev => prev.includes(id) ? prev.filter(contactId => contactId !== id) : [...prev, id])
  }

  function handleSubmit(e) {
    e.preventDefault()
    createConversation(selectedContactIds) //creates conversation with passed array of contacts
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check type='checkbox' value={selectedContactIds.includes(contact.id)} label={contact.name} onChange={() => handleCheckboxChange(contact.id)} />
            </Form.Group>
          ))}
          <Button type='submit' className='my-3'>Add Contact</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal