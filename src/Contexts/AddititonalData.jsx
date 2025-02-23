import PropTypes from "prop-types";
import { FormDataContext } from "./CreateContext";
import { useState } from "react";
// import { handleFormCancel } from "../Backend/FormFunctionality";
export const UserFormData = ({ children }) => {
    const [groupData,setGroupData] = useState([])
  return (
    <FormDataContext.Provider value={{groupData,setGroupData}}>
      {children}
    </FormDataContext.Provider>
  );
};
UserFormData.propTypes = {
  children: PropTypes.node.isRequired,
};