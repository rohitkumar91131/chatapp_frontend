import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = ({children}) =>{
    const [notifications , setNotifications ]= useState({
        HomePage : false,
        status : false,
        group : false
    })
    
    const setNotification = (tab , value) =>{
        setNotifications(prev => ({
            ...prev ,
            [tab] : value
        }))
    }
    return <NotificationContext.Provider value={{ notifications , setNotification}}>
        {children}
    </NotificationContext.Provider>
}

export const useNotification = ()=>useContext(NotificationContext)