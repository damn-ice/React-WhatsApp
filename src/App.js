import DashBoard from './components/DashBoard';
import Login from "./components/Login";
import { ContactsProvider } from './contexts/ContactsProvider';
import ConversationProvider from './contexts/ConversationProvider';
import SocketProvider from './contexts/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';




/*
  In short circuit (i.e let name = 'Joel' && 'Priye' or let age = 8 || 12), If the && short
    circuit is used it will return the last true evaluation but if || is used it will return the first 
    true evaluation.
*/ 


function App() {
  const [id, setId] = useLocalStorage('id');

  const dashBoard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <DashBoard id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
    id ? dashBoard : <Login onSetId={setId} />
  );
}

export default App;
