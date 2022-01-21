import React, { createContext } from 'react'
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
    let socket;

    const dispatch = useDispatch();

    if (!socket) {
        socket = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live')

        socket.addEventListener('message', (event) => {
          const gameEvent = JSON.parse(JSON.parse(event.data))
          dispatch({
              type: gameEvent.type,
              data: gameEvent
          })
        })
    }

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider