function GroupHeader() {
    return (
      <div className="w-full h-full !p-2 bg-white shadow-md flex flex-row items-center justify-between border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Groups</h1>
  
        <div className="flex items-center gap-4">
          <button className="rounded-full hover:bg-gray-100 transition">
            <img src="icons/NewGroup.svg" className="h-[25px] w-[25px]" alt="New Group" />
          </button>
  
          <button className="rounded-full hover:bg-gray-100 transition">
            <img src="setting.svg" className="h-[40px] w-[40px]" alt="Settings" />
          </button>
        </div>
      </div>
    );
  }
  
  export default GroupHeader;
  