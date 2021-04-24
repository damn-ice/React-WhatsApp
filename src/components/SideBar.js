import { Tab, Nav, Button, Modal} from  'react-bootstrap';
import {useState} from 'react';
import Conversation from './Conversation';
import Contact from './Contact';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';


const CONVERSATION_KEY = 'conversations';
const CONTACT_KEY = 'contacts';

const SideBar = ({id}) => {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATION_KEY

    const modalClose = () => {
        setModalOpen(false);
    }

    return (
        <div className="d-flex flex-column" style={{width: '250px'}}>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item> 
                        <Nav.Link eventKey={CONTACT_KEY}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contact />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your ID: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {conversationOpen ? 'Conversation': 'Contacts'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={modalClose} >
                {conversationOpen ?
                    <NewConversationModal modalClose={modalClose} />:
                    <NewContactModal modalClose={modalClose} />
                }
            </Modal>

        </div>
    )
}

export default SideBar
