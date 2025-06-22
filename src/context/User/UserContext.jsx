import { createContext, useContext, useState } from "react";

export const userContext = createContext(null);

export const useUser = ()=> useContext(userContext);

export const UserProvider = ({ children }) => {
    const [id, setId] = useState(null);

    return (
        <userContext.Provider value={{ id, setId }}>
            {children}
        </userContext.Provider>
    );
}