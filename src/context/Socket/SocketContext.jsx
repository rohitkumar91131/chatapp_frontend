import { createContext, useContext } from "react";
import socket from "./socket";

export const SocketContext = createContext(socket);

export const SocketContextProvider = ({children}) =>{
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export const useSocket = () => useContext(SocketContext);
