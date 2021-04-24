import React, { useCallback, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();


export const useConversation = () =>{
    return useContext(ConversationContext);
}

const ConversationProvider = ({id, children}) => {
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    // Array of contacts...
    const {contacts} = useContacts();

    const [conversations, setConversations] = useLocalStorage('conversations', [])

    // Socket we joined...
    const socket = useSocket()

    const createConversations = (recipients) =>{
        // The first argument of a setState is the current state when using a function...
        setConversations(prevConversation => {
            return [...prevConversation, {recipients, messages: []}]
        })
    }

    // UseCallback was used to prevent function recreation on every render...
    const addMessageToConversation = useCallback( 
        ({recipients, text, sender}) => {
        setConversations(prevConversation => {
            // old means if change was made to an existing conversation,
            // will resolve to false if the conversation doesn't exist yet... 
            let old = false;
            const newMessage = {sender, text}
            const newConversations = prevConversation.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)){
                    old = true;
                    return {...conversation, messages: [...conversation.messages, newMessage]}
                }
                return conversation;
            })

            if (old){
                return newConversations;
            }else {
                return [...prevConversation, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return;
        // receive message event result parsed to addMessage...
        socket.on('receive-message', addMessageToConversation)
        return () => socket.off('receive-message');
    }, [socket, addMessageToConversation])

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', {recipients, text})

        addMessageToConversation({recipients, text, sender: id})
    }

    const formattedConversations = conversations.map( (conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            // Check if contact is saved and return the contact if true...
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            // Return either a contact name or the id...
            const name = (contact && contact.name) || recipient
            // const name = contact ? contact.name: recipient ... same as above...
            return {id: recipient, name}
        })
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender;
            })
            const name = (contact && contact.name) || message.sender ;
            const fromMe = message.sender === id;
            return {...message, senderName: name, fromMe}
        })
        const selected = selectedConversationIndex === index;
        return {...conversation, messages, recipients, selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        createConversations,
        sendMessage
        }


    const arrayEquality = (a, b) => {
        if (a.length !== b.length) return false;

        a.sort();
        b.sort()

        return a.every((element, id) => {
            return element === b[id];
        })
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider