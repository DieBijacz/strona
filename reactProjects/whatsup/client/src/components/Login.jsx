import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ onIdSubmit }) => {
  const idRef = useRef()

  // login
  const handleSubmit = (e) => {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }

  // create new account
  const createNewId = () => {
    onIdSubmit(uuidV4())
  }

  return (
    <Container className='align-items-center d-flex gap-3' style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button type='submit'>Login</Button>
        <Button onClick={createNewId} variant='secondary' className='m-2'>Create New Account</Button>
      </Form>
    </Container >
  )
}

export default Login