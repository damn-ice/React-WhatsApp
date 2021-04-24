import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversation } from '../contexts/ConversationProvider';

const NewConversationModal = ({ modalClose }) => {

    const {contacts} = useContacts();

    const {createConversations} = useConversation();

    const [selectedContactsId, setSelectedContactsId] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        createConversations(selectedContactsId);
        modalClose();
    }

    const handleCheckBox = (id) => {
        setSelectedContactsId(prevSelected => {
            if (prevSelected.includes(id)){
                return prevSelected.filter(prevId => prevId !== id)
            }else {
                return [...prevSelected, id]
            }
        })
    }
    return (
        <>
            <Modal.Header closeButton={modalClose}>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id} >
                            <Form.Check 
                                type="checkbox"
                                // To display on the UI
                                value={selectedContactsId.includes(contact.id)}
                                label={contact.name}
                                // To set the State...
                                onChange={() => handleCheckBox(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewConversationModal
