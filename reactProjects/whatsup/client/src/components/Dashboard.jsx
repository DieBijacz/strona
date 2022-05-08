import React from 'react'
import { useConversations } from '../context/ConversationProvider'
import OpenConversation from './OpenConversation'
import SideBar from './SideBar'

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversations()

  return (
    <div className='d-flex' style={{ height: '100vh' }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}

export default Dashboard