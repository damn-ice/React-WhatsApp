import {Modal, Form, Button} from 'react-bootstrap'
import {useRef} from 'react';
import { useContacts } from '../contexts/ContactsProvider';


const NewContactModal = ({modalClose}) => {

    const idRef = useRef();
    const nameRef = useRef();

    const {createContact} = useContacts()

    const handleSubmit = (e) => {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value)
        modalClose()
    }

    return (
        <>
            <Modal.Header closeButton={modalClose}>New Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" ref={idRef} placeholder="Input ID"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" ref={nameRef} placeholder="Input Name"/>
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewContactModal
