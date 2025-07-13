import { createContext, useContext, useState } from "react";

export const StatusContext = createContext();
export const StatusProvider = ({children}) =>{
    const [ status , setStatus ] = useState([])
    return <StatusContext.Provider value={{ status , setStatus}}>
        {children}
    </StatusContext.Provider>
}

export const useStatus = ()=>useContext(StatusContext);