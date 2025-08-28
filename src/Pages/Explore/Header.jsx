import { Menu } from "lucide-react"
import { useExplore } from "./ExploreContext";
import { useEffect } from "react";

function Header() {
    const { inputValue, isInputActive, setInputValue, setIsInputActive } = useExplore();
    const handleInputChange = (e)=>{
      setInputValue(e.target.value)
    }


  return (
    <header className="w-[100dvw] flex items-center justify-between px-4 py-2 shadow-md bg-white h-[64px]">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Vartalaap Logo" className="w-8 h-8" />
        <h1 className="font-bold text-xl">Vartalaap</h1>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search User..."
          onChange={handleInputChange}
          className="w-full px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={()=>setIsInputActive(true)}
        />
      </div>
      {isInputActive ? "Yes " : "no"}
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

export default Header
