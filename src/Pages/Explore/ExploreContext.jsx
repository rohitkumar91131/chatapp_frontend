import { createContext, useContext, useState } from "react";

const ExplorePageContext = createContext();

export const ExploreContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  return (
    <ExplorePageContext.Provider value={{ inputValue, isInputActive, setInputValue, setIsInputActive }}>
      {children}
    </ExplorePageContext.Provider>
  );
};

export const useExplore = () => useContext(ExplorePageContext);
