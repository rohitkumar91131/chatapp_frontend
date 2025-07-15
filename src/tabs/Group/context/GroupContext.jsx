import { createContext, useContext, useRef, useState } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children}) =>{
    const GroupsSlideRef = useRef(null);
    const GroupSlideRef = useRef(null);
    const [groupRoomId , setGroupRoomId] = useState(null);
    const GroupSettingRef = useRef(null);
    return <GroupContext.Provider value={{ GroupSlideRef , GroupsSlideRef ,groupRoomId , setGroupRoomId , GroupSettingRef }}>
        {children}
    </GroupContext.Provider>
}

export const useGroup = () => useContext(GroupContext);