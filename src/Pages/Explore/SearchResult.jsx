import { useEffect, useState } from "react";
import { useExplore } from "./ExploreContext"
import {Link} from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SearchResult() {
    const { inputValue, isInputActive, setInputValue, setIsInputActive } = useExplore();
    const [searchResult , setSearchResult ] = useState([]);
    const [error ,setError ] = useState("");
    useEffect(()=>{
        if(!inputValue || inputValue.trim() ==="") return;
        fetchAllUsers();
        return ()=>{
            setSearchResult([])
        }
    },[inputValue])
    async function fetchAllUsers(){
        try{
            const  res = await fetch(`${BACKEND_URL}/fetchAllUsers/${inputValue}`,{
                method :"GET"
            })
            const data = await res.json();
            console.log(data)
            if(data.success){
                setSearchResult(data.allusers)
            }
            else{
                setError(data.msg)
            }
        }
        catch(err){
            setError(err.message)
        }
    }
    if(error){
        return <div className="w-[100dvw] h-[50dvh] flex items-center justify-center">
            {error}
        </div>
    }
  else return (
    <div className={`w-[100dvw] absolute top-[64px] bg-white sm:max-w-[50dvw] border max-h-[50dvh] ${isInputActive ? "block" : "hidden"}  ` }>
       { searchResult?.length > 0 ?
        <div className="flex flex-col ">
            {
                searchResult.map((result,index)=>(
                     <Link to={`/${result?.username}`} key={index} className="flex w-full justify-start !p-2 gap-2 items-center">
                        <img src={result?.profilePhoto} className="w-12 h-12 rounded-full "/>
                        <p>{result?.name}</p>
                    </Link>    
                ))
            }
        </div>   
        :
        <span className="h-[50dvh] flex items-center justify-center">
            No user found
        </span>
       }
    </div>
  )
}

export default SearchResult
