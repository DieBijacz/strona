import React from 'react'
import { useContacts } from '../context/ContactsProvider'
import { Button, ListGroup } from 'react-bootstrap'

// TODO delete contact

const Contacts = ({ closeModal }) => {
  const { contacts, deleteContact } = useContacts()

  return (
    <ListGroup variant='flush'>
      {contacts.map((contact, index) => (
        <ListGroup.Item className='d-flex justify-content-between' key={contact.id}>
          {contact.name}
          <Button className='btn-danger btn-sm' onClick={() => deleteContact(index)}>delete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts