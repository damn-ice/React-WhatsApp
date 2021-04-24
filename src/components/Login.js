import  {Container, Form, Button} from 'react-bootstrap';
import {useRef} from 'react';
import {v4 as uuidV4} from 'uuid';


const Login = ({onSetId}) => {
    const idRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetId(idRef.current.value)

    }

    const createNewId = () => {
        onSetId(uuidV4)
    }
    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100" >
                <Form.Group>
                    <Form.Label>
                        ID
                    </Form.Label>
                    <Form.Control type='text' ref={idRef} placeholder="Enter Your ID" required></Form.Control>
                </Form.Group>
                <Button type='submit' className='mr-2'>Login</Button>
                <Button onClick={createNewId} variant='warning'>Create a New ID</Button>
            </Form>
        </Container>
    )
}

export default Login
