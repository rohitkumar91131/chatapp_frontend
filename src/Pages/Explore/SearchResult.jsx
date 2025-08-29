import { useEffect, useRef, useState } from "react";
import { useExplore } from "./ExploreContext";
import { Link } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SearchResult() {
  const { inputValue, isInputActive, setIsInputActive } = useExplore();
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!inputValue || inputValue.trim() === "") {
      setSearchResult([]);
      return;
    }
    fetchAllUsers();
  }, [inputValue]);

  useEffect(() => {
    function handleOutside(e){
      if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
        setIsInputActive(false);
      }
    }

    document.addEventListener("mousedown",handleOutside);
    return ()=>{
      document.removeEventListener("mousedown", handleOutside)
    }  
  }, [setIsInputActive]);

  async function fetchAllUsers() {
    try {
      const res = await fetch(`${BACKEND_URL}/fetchAllUsers/${inputValue}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setSearchResult(data.allusers);
        setError("");
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (!isInputActive) return null; // dropdown hidden if input is not active

  if (error) {
    return (
      <div className="w-[100dvw] h-[50dvh] border absolute top-[64px] bg-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="w-[100dvw] absolute top-[64px] bg-white sm:max-w-[50dvw] border max-h-[50dvh]"
    >
      {searchResult?.length > 0 ? (
        <div className="flex flex-col">
          {searchResult.map((result, index) => (
            <Link
              to={`/${result?.username}`}
              key={index}
              className="flex w-full justify-start !p-2 gap-2 items-center"
              onClick={() => setIsInputActive(false)}
            >
              <img
                src={result?.profilePhoto}
                className="w-12 h-12 rounded-full"
              />
              <p>{result?.name}</p>
            </Link>
          ))}
        </div>
      ) : (
        <span className="w-full sm:w-[50%] bg-white text-center">
          {inputValue.trim() === "" ? <p>Search User</p> : <p>No User found</p>}
        </span>
      )}
    </div>
  );
}

export default SearchResult;
