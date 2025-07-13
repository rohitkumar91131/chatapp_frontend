import { useContext, useEffect, useState } from "react"
import { useStatus } from "./StatusContext"
import { closeStatusShower } from "../../ui/gsap";

function StatusShower() {
    const {status} = useStatus();
    const [showContent , setShowContent] = useState([]);
    const addCounterTOStatus = (status)=>{
        console.log(status)
        setShowContent(prev => 
            prev.map((item,i) => ({
                ...item,
                counter: i+ 1
            }))
        );
        
        console.log(showContent)
    }
    const [counter, setCounter] = useState(1);
    useEffect(()=>{
        setShowContent(status);        
        addCounterTOStatus(status)
    },[status])
    useEffect(()=>{
        //console.log("status " + JSON.stringify(status))
        console.log(showContent)
    },[counter])
  return (
    <div className="h-[100vh] w-full bg-white grid grid-rows-[1fr_8fr_1fr]">
      <div className="">
            <div className="flex  items-center w-full h-full ">
                <img src="/icons/LeftIcon.svg" className="w-[50px] h-[50px] rounded-full" onClick={closeStatusShower} />
               {
                showContent.length>0 && showContent.map((content,index)=>(
                    <div key={index} className="flex items-center gap-2">
                        {content.counter === counter && <img src={content?.user?.profilePhoto} className="h-[40px] w-[40px] rounded-full" />}
                        <div>
                        <p>{content.counter === counter && content?.user?.name}</p>
                        <p>{content.counter === counter && new Date(content.createdAt).toLocaleString()}</p>
                        </div>    
                    </div>
                ))
               }
            </div>

      </div>
      <div className="flex items-center h-full w-full justify-between">
        {/* {status.map(state=>(
            <p>{state.text}</p>
        ))} */}
        <img src="icons/LeftIcon.svg" className={`w-[40px] h-[40px] ${counter=== 1 ? "opacity-0 invisible" : "opacity-100 visible"} `} onClick={()=> setCounter(prev => prev -1)}/>
        <div className="h-full w-full bg-red-500">
            {
                showContent.length > 0 && 
                (
                    showContent.map((state , index)=>(
                        <div className="flex items-center justify-center  " key={index}>{state.counter === counter && state.text}</div>
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
