import PropTypes from "prop-types";
import { useState } from "react";
import { ToDoContext } from "./CreateContext";
import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
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
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};