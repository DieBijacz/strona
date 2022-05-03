import React from 'react'
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationProvider } from '../context/ConversationProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashborad = (
    <ContactsProvider>
      <ConversationProvider>
        <Dashboard id={id} />
      </ConversationProvider>
    </ContactsProvider>
  )

  return (
    id ? dashborad : <Login onIdSubmit={setId} />
  );
}

export default App;
