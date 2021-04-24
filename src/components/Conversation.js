import {ListGroup} from 'react-bootstrap';
import { useConversation } from '../contexts/ConversationProvider';

const Conversation = () => {

    const {conversations, selectedConversationIndex} = useConversation()

    return (
        <ListGroup variant="flush">
        {conversations.map((conversation, index) => (
            <ListGroup.Item 
                key={index}
                action
                onClick={() =>  selectedConversationIndex(index)}
                // This active is what make the selected conversation blue...
                active={conversation.selected}            
            >
                {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>
        ))}
    </ListGroup>
    )
}

export default Conversation
