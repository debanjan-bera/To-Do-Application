import { useState } from "react";
// import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
import { ToDoContext } from "./CreateContext";
import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
// import { createContext } from "react";

// export const ToDoContext = createContext(null);
// export const ToDoContext = createContext()

export const DataProvider = ({ children }) => {
    const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  
  const [windowOpen, setWindowClose] = useState(false);
  const [isOk, setOk] = useState(false);
  const [filteredData, setFilteredData] = useState(() =>
    getFilteredLocalStorage()
  );
  return (
    <ToDoContext.Provider value={{taskArr,setTaskArr,windowOpen,setWindowClose,isOk,setOk,filteredData,setFilteredData}}>
      {children}
    </ToDoContext.Provider>
  );
  
};