import React from 'react'
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationProvider } from '../context/ConversationProvider';
import { SocketProvider } from '../context/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashborad = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashborad : <Login onIdSubmit={setId} />
  );
}

export default App;
