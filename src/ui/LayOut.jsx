import { useEffect } from "react";
import { useTab } from "../context/tab/TabContext";
import HomePage from "../Pages/HomePage/Home";
import Navbar from "./NavigationMenu";
import SearchUser from "../Pages/explore/SearchUser";
import ProfilePage from "./Profile";
import Status from "../tabs/Status/Status";
import Settings from "../tabs/Settings/Settings";
import { useSocket } from "../context/Socket/SocketContext";
import GroupHome from "../tabs/Group/GroupHome";


export default function LayOut() {
    const socket = useSocket();
    const {activeTab} = useTab();
    const renderTab = ()=>{
        switch(activeTab){
            case "HomePage" :{
                return <HomePage/>
            }
            case  "SearchUser" : {
                return <SearchUser/>
            }
            case "Profile" : {
                return <ProfilePage/>
            }
            case "Status" : {
                return <Status/>
            }
            case "Group" : {
                return <GroupHome/>
            }
            case "Settings" : {
                return <Settings/>
            }
            default : {
                return <HomePage/>
            }
        }
    }
    useEffect(()=>{
        if(!socket.connected){
            socket.connect();
        }

        return ()=>{
            socket.disconnect();
        }
    },[])
  return (
    <div className="grid md:grid-cols-[1fr_9fr] md:grid-rows-1 grid-cols-1 grid-rows-[9fr_1fr] h-[100dvh] w-[100dvw] overflow-hidden ">
      <div className="order-2 md:order-1 md:border-r boder-t">
        <Navbar />
      </div>
      <div className="order-1 md:order-2 md:border-l border-b">
        {renderTab()}
      </div>
    </div>
  )
}

