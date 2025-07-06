import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useTab } from '../context/tab/TabContext'

export const navItems = [
  { label: 'Home', component: "HomePage" , icon: '/icons/HomeIcon.svg' },
  { label: 'Explore', component: "SearchUser", icon: '/icons/ExploreIcon.svg' },
  { label: 'Profile',component: "Profile", icon: '/icons/ProfileIcon.svg' },
  { label: 'Status',component: "Status", icon: '/icons/StatusIcon.svg' },
  { label: 'Groups', component: "Group", icon: '/icons/GroupsIcon.svg' },
  { label: 'Settings', component: "Settings", icon: '/icons/ SettingsIcon.svg' }
]



export default function Navbar() {
    const { activeTab ,dispatch } = useTab();

useEffect(()=>{
    console.log("Set");
    console.log(activeTab)
},[])
  const location = useLocation()
  const [activePath, setActivePath] = useState(location.pathname)

  return (
    <nav className="h-full w-[100dvw] md:w-full md:h-[100dvh] ">
      <ul className="flex justify-around items-center py-2 flex-row md:flex-col ">
        {navItems.map((item , index) => (
          <li key={index}>
            <Link
              to={item.path}
              onClick={() => dispatch({ type : "SET_TAB" , payload : item.component})}
              className="flex flex-col items-center text-xs text-gray-600 hover:text-black transition"
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-6 h-6 mb-1 ${
                  activePath === item.path ? 'text-black' : 'opacity-60'
                }`}
              />
              <span
                className={`${
                  activePath === item.path ? 'text-black font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
