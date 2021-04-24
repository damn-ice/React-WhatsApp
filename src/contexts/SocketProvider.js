import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}

const SocketProvider = ({id, children}) => {

    const [socket, setSocket] = useState();

    useEffect(() => {
        // New socket created...
        const newSocket = io('http://localhost:4000', {query: {id}})
        // Set state of socket
        setSocket(newSocket)
        // Did unmount close socket connection to prevent multiple connection...
        return () => newSocket.close();
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
