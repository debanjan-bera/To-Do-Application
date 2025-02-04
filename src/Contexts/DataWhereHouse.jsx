import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { ToDoContext } from "./CreateContext";
import { getFilteredLocalStorage, getLocalStorage } from "../Backend/LocalStorage";
// import { handleFormCancel } from "../Backend/FormFunctionality";
export const DataProvider = ({ children }) => {
    const [taskArr, setTaskArr] = useState(() => getLocalStorage());
    const [windowOpen, setWindowClose] = useState(false);
    const [filteredData, setFilteredData] = useState(() => getFilteredLocalStorage());
    const [mobileAddButton,setmobileAddButton] = useState(false)
      const handleAddTaskWindow = useCallback(() => {
        setWindowClose((prev) => !prev);
      }, [setWindowClose]);

  return (
    <ToDoContext.Provider value={{taskArr,setTaskArr,windowOpen,setWindowClose,filteredData,setFilteredData,handleAddTaskWindow,mobileAddButton,setmobileAddButton}}>
      {children}
    </ToDoContext.Provider>
  );
};
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};