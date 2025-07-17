import { createContext, useContext, useRef, useState } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children}) =>{
    const GroupsSlideRef = useRef(null);
    const GroupSlideRef = useRef(null);
    const [groupRoomId , setGroupRoomId] = useState(null);
    const GroupSettingRef = useRef(null);
    const MembersAddFormRef = useRef(null);
    const [allGroups, setAllGroups] = useState([]);
    const [ allmembers , setAllMembers ] = useState([]);
    const GroupDetailsRef = useRef(null);
    return <GroupContext.Provider value={{   GroupSlideRef , GroupsSlideRef ,groupRoomId , setGroupRoomId , GroupSettingRef ,MembersAddFormRef ,allGroups, setAllGroups , allmembers , setAllMembers ,GroupDetailsRef}}>
        {children}
    </GroupContext.Provider>
}

export const useGroup = () => useContext(GroupContext);