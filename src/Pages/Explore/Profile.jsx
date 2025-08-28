import { useParams , Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { UserPlus, Check, Hourglass, UserCheck,  } from "lucide-react"
import Header from "./Header";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const { username } = useParams();
  const [userData , sentUserData ] = useState();
  const [friendStatus, setFriendStatus] = useState("none");

  useEffect(()=>{
    if(!username) return;
    getUserDetails();
    
  },[username])

  async function getUserDetails(){
    try{
        let res = await fetch(`${BACKEND_URL}/getUserData/${username}`,{
            method : "GET"
        })
        let data = await res.json();
        sentUserData(data?.user);
    }
    catch(err){
        console.log(err)
    }
  }

  const handleFriendship = () => {
    if (friendStatus === "none") setFriendStatus("requested")
    else if (friendStatus === "requested") setFriendStatus("pending")
    else if (friendStatus === "pending") setFriendStatus("friends")
  }

  const getButtonContent = () => {
    switch (friendStatus) {
      case "none":
        return (
          <>
            <UserPlus className="w-4 h-4 mr-2" /> Send Request
          </>
        )
      case "requested":
        return (
          <>
            <Hourglass className="w-4 h-4 mr-2" /> Request Sent
          </>
        )
      case "pending":
        return (
          <>
            <Check className="w-4 h-4 mr-2" /> Accept Request
          </>
        )
      case "friends":
        return (
          <>
            <UserCheck className="w-4 h-4 mr-2" /> Friends
          </>
        )
      default:
        return "Send Request"
    }
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
            onClick={handleFriendship}
            className={`mt-2 flex items-center px-4 py-2 rounded-2xl shadow text-white 
              ${friendStatus === "friends" ? "bg-green-600" : "bg-blue-600"}`}
          >
            {getButtonContent()}
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
