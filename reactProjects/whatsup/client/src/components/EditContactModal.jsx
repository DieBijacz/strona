import React from 'react'
import { Form, Modal } from 'react-bootstrap'

const EditContactModal = ({ closeModal }) => {

  function handleSubmit(e) {
    e.preventDefault()
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>
          <Button type='submit' className='my-3'>Add Contact</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default EditContactModal