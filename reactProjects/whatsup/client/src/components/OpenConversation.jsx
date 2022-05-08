import React, { useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'

const OpenConversation = () => {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setText('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>

      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className='m-3'>
          <InputGroup>
            <Form.Control as='textarea' required value={text} onChange={e => setText(e.target.value)} style={{ height: '75px', resize: 'none' }} />
            <Button type='submit'>Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  )
}

export default OpenConversation