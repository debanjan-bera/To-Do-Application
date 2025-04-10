import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { ToDoContext } from "./CreateContext";
import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
export const DataProvider = ({ children }) => {
  const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  const [filteredData, setFilteredData] = useState(() => getFilteredLocalStorage());
  const [windowOpen, setWindowClose] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [mobileAddButton,setmobileAddButton] = useState(false)
  const [isShowInfoId,setInfoId] = useState(null)
  const handleAddTaskWindow = useCallback(() => {
        setWindowClose((prev) => !prev);
      }, [setWindowClose]);

  return (
    <ToDoContext.Provider value={{taskArr,setTaskArr,windowOpen,setWindowClose,filteredData,setFilteredData,activeMenuId, setActiveMenuId,handleAddTaskWindow,mobileAddButton,setmobileAddButton,isShowInfoId,setInfoId}}>
      {children}
    </ToDoContext.Provider>
  );
};
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}