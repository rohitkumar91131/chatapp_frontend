
export default function Header() {
  return (
    <div className="flex h-[70px] w-full justify-around items-center">
        <div className="flex items-center gap-2">
        <img src="logo.svg"  className="w-[50px] h-[50px]"/>
        <p className="text-black text-3xl font-semibold">Vartalaap</p>
        </div>
        <div className="">
            <img src="setting.svg" className="w-[50px] h-[50px]" />
        </div>
      
    </div>
  )
}

