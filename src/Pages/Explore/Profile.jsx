import { useParams , Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { UserPlus, Check, Hourglass, UserCheck,  } from "lucide-react"
import Header from "./Header";
import { useSocket } from "../../context/Socket/SocketContext";
import ProfileSkeleton from "./ProfileSkeleton";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const { username } = useParams();
  const [userData , sentUserData ] = useState();
  const [friendStatus, setFriendStatus] = useState("none");
  const [loading , setLoading ] = useState(true);
  const socket = useSocket();
  const [ userError ,setUserError] = useState("");
  useEffect(()=>{
    if(!username) return;
    getUserDetails();

    socket.emit("check-friendship-status",username ,(res)=>{
      setFriendStatus(res);
    })
    
  },[username])

  async function getUserDetails(){
    try{
        let res = await fetch(`${BACKEND_URL}/getUserData/${username}`,{
            method : "GET"
        })
        let data = await res.json();
        console.log(data)
        if(!data.user){
          setUserError(data.msg);
          return;
        }
        sentUserData(data?.user);
    }
    catch(err){
      setUserError(err.message)
    }
    finally{
      setLoading(false);
    }
  }

  if(loading){
    return <div className="w-full h-full ">
      <ProfileSkeleton/>
    </div>
  }
  if(userError){
    return <p className="w-full h-full flex items-center justify-center">{userError}</p>
  }

  return (
    <div className="w-[100dvw] !p-6 flex flex-col items-center bg-gray-50">
      <div className="flex items-center gap-6">
        <img 
          src={userData?.profilePhoto} 
          alt="profile" 
          className="w-24 h-24 rounded-full border shadow" 
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold capitalize">{userData?.username}</h2>
          <p className="text-gray-600">{userData?.name}</p>
          <button 

            className={`mt-2 flex items-center px-4 py-2 rounded-2xl shadow text-white 
              ${friendStatus === "friends" ? "bg-green-600" : "bg-blue-600"}`}
          >
            {friendStatus}
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-lg">
        <h3 className="text-lg font-medium mb-4">Friends</h3>
        <div className="grid grid-cols-3 gap-4">
          {userData?.connections?.friends?.map((friend, idx) => (
            <Link to={`/${friend.username}`}
            
              key={idx} 
              className="p-2 flex flex-col items-center border rounded-lg shadow bg-white"
            >
              <img 
                src={friend.profilePhoto} 
                alt={friend} 
                className="w-12 h-12 rounded-full"
              />
              <p className="text-sm mt-1">{friend.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
