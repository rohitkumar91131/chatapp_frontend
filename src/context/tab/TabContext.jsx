import { createContext, useContext, useReducer, useRef } from "react";

const TabContext = createContext(null);
const tabReducer = (state , action )=>{
    switch(action.type){
        case "SET_TAB" :{
            return action.payload
        }
        default : {
            return state;
        }
    }
}
export const TabContextProvider = ({children}) =>{
    const [activeTab , dispatch ] = useReducer(tabReducer , "HomePage");
    return <TabContext.Provider value={{activeTab , dispatch}}>
        {children}
    </TabContext.Provider>
}

export const useTab = () => useContext(TabContext);