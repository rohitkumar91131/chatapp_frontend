import { openTextStatusForm, TextStatusFormRef } from "../../ui/gsap"
import StatusForm from "./StatusForm"

function StatusHeader() {
    const handleOpenForm = () =>{
        if(TextStatusFormRef.current){
            openTextStatusForm(TextStatusFormRef.current)
        }
    }
    return (
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white shadow-sm h-[100px] relative">
        <div className="flex items-center gap-2">
          <img src="logo.svg" className="w-[48px] h-[48px] cursor-pointer" />
          <p className="text-2xl font-semibold text-gray-800 tracking-tight">Status</p>
        </div>
  
        <div className="flex items-center gap-5">
          <div className=" group">
            <img
              src="icons/AddStatusIcon.svg"
              className="w-[28px] h-[28px] cursor-pointer hover:scale-105 transition"
              onClick={handleOpenForm}
            />
            <p className="opacity-0 group-hover:opacity-100 absolute top-full right-0 mt-2 text-xs bg-gray-900 text-white px-2 py-1 rounded-md shadow transition-opacity duration-200 whitespace-nowrap">
              Add Status
            </p>
            <div ref={TextStatusFormRef} className="invisible opacity-0 absolute right-0 md:right-3  " >
               <StatusForm/>
            </div>
          </div>
  
          <img
            src="setting.svg"
            className="w-[46px] h-[46px] cursor-pointer"
          />
        </div>
      </div>
    )
  }
  
  export default StatusHeader
  