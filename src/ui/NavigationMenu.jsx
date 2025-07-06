import { useTab } from '../context/tab/TabContext'
import { useNotification } from '../context/notification/Notification'

export const navItems = [
  { label: 'Home', component: 'HomePage', icon: '/icons/HomeIcon.svg' },
  { label: 'Explore', component: 'SearchUser', icon: '/icons/ExploreIcon.svg' },
  { label: 'Profile', component: 'Profile', icon: '/icons/ProfileIcon.svg' },
  { label: 'Status', component: 'Status', icon: '/icons/ StatusIcon.svg' },
  { label: 'Groups', component: 'Group', icon: '/icons/GroupsIcon.svg' },
  { label: 'Settings', component: 'Settings', icon: '/icons/ SettingsIcon.svg' }
]

export default function Navbar() {
  const { activeTab, dispatch } = useTab()
  const { notifications } = useNotification()
 
  return (
    <nav className="h-full w-[100dvw] md:w-full md:h-[100dvh]">
      <ul className="flex justify-around items-center py-2 flex-row md:flex-col md:gap-5">
        {navItems.map((item, index) => (
          <li key={index}>
            <div
              onClick={() => dispatch({ type: 'SET_TAB', payload: item.component })}
              className="flex flex-col items-center text-xs text-gray-600 hover:text-black transition relative cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-6 h-6 mb-1 ${
                    activeTab === item.component ? 'opacity-100' : 'opacity-60'
                  }`}
                />
                {notifications[item.component] && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              <span
                className={`${
                  activeTab === item.component ? 'text-black font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}
