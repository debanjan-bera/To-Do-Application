import PropTypes from "prop-types";
import { useState } from "react";
import { ToDoContext } from "./CreateContext";
import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
export const DataProvider = ({ children }) => {
    const [taskArr, setTaskArr] = useState(() => getLocalStorage());
    const [windowOpen, setWindowClose] = useState(false);
    const [filteredData, setFilteredData] = useState(() =>getFilteredLocalStorage());
    const [mobileAddButton,setmobileAddButton] = useState(false)
  return (
    <ToDoContext.Provider value={{taskArr,setTaskArr,windowOpen,setWindowClose,filteredData,setFilteredData,mobileAddButton,setmobileAddButton}}>
      {children}
    </ToDoContext.Provider>
  );
};
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};