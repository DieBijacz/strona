import React from 'react'
import { useContacts } from '../context/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

// TODO delete contact

const Contacts = () => {
  const { contacts } = useContacts()

  return (
    <ListGroup variant='flush'>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts