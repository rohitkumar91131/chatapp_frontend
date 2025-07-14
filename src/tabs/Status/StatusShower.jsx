import { useContext, useEffect, useState } from "react"
import { useStatus } from "./StatusContext"
import { closeStatusShower, showStatusShowerSetting, statusShowerSettinfRef } from "../../ui/gsap";

function StatusShower() {
    const {status , setStatus} = useStatus();
    const [showContent , setShowContent] = useState([]);
    const [current , setCurrent] = useState();
    const addCounterTOStatus = (status)=>{
        //console.log(status)
        setShowContent(prev => 
            prev.map((item,i) => ({
                ...item,
                counter: i+ 1
            }))
        );
        
       // console.log(showContent)
    }
    const [counter, setCounter] = useState(1);
    useEffect(()=>{
        setShowContent(status);        
        addCounterTOStatus(status);


    },[status])
    useEffect(()=>{
        //console.log("status " + JSON.stringify(status))
        //console.log(showContent)
    },[counter]);
    const handleCloseStatusShower = ()=>{
        setStatus([]);
        setShowContent([]);
        setCounter(1)
        closeStatusShower();
    }
    const handleStatusDelete = ()=>{

    }
  return (
    <div className="h-[100vh] w-full bg-white grid grid-rows-[1fr_8fr_1fr] relative">
      <div className="">
            <div className="flex  items-center justify-between g w-[100vw] h-full ">
                <img src="/icons/LeftIcon.svg" className="w-[50px] h-[50px] rounded-full" onClick={handleCloseStatusShower} />
                <div>
                {
                showContent.length>0 && showContent.map((content,index)=>(
                    <div key={index} className="flex items-center gap-3">
                        {content.counter === counter && <img src={content?.user?.profilePhoto} className="h-[40px] w-[40px] rounded-full" />}
                        <div>
                        <p>{content.counter === counter && content?.user?.name}</p>
                        <p>{content.counter === counter && new Date(content.createdAt).toLocaleString()}</p>
                        </div>    
                    </div>
                ))
               }
                </div>
              <img
                src="setting.svg"
                className="w-[66px] h-[66px] cursor-pointer"
                onClick={()=>showStatusShowerSetting(statusShowerSettinfRef.current)}
              />
            </div>
            <div className="border rounded-md bg-white !p-2 invisible opacity-0 w-fit absolute right-2" ref={statusShowerSettinfRef} onClick={handleStatusDelete}>
                <button className="text-red-600 hover:underline">
                   <span>🗑️ Delete Status</span>
                </button>
              </div>

      </div>
      <div className="flex items-center h-full w-full justify-between">
        {/* {status.map(state=>(
            <p>{state.text}</p>
        ))} */}
        <img src="icons/LeftIcon.svg" className={`w-[40px] h-[40px] ${counter=== 1 ? "opacity-0 invisible" : "opacity-100 visible"} `} onClick={()=> {setCounter(prev => prev -1) }}/>
        <div className="h-[80dvh] w-full md:w-[40%] !pt-5 bg-[#f5f5dc] overflow-y-auto flex text-center justify-center">
            {
                showContent.length > 0 && 
                (
                    showContent.map((state , index)=>(
                        <div className=" whitespace-pre-wrap " key={index}>{state.counter === counter && state.text}</div>
                    ))
                )

            }
        </div>
        <img src="icons/RightIcon.svg" className={`w-[40px] h-[40px] ${counter === status.length ? "opacity-0 invisible" : "opacity-100 visible"} `} onClick={()=> setCounter(prev => prev +1)}/>
      </div>
      <div>
        reply section
      </div>
    </div>
  )
}

export default StatusShower
