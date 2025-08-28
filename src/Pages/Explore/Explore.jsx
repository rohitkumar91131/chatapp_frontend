import Header from "./Header"
import Profile from "./Profile"
import SearchResult from "./SearchResult"


function Explore() {
  return (
    <div className="w-[100dvw] h-[100dvh] overflow-hidden flex items-center flex-col">
      <Header/>
      <SearchResult/>
      <Profile/>
    </div>
  )
}

export default Explore
