import PropTypes from "prop-types";
import { FormDataContext } from "./CreateContext";
import { useState } from "react";
// import { handleFormCancel } from "../Backend/FormFunctionality";
export const UserFormData = ({ children }) => {
    const [groupData,setGroupData] = useState(['Reading','Gaming','Traveling','Music','College','Others'])
    const [isInfoOpen,setInfoOpen] = useState(false)
    const [category,setCategory] = useState()
  return (
    <FormDataContext.Provider value={{groupData,setGroupData,isInfoOpen,setInfoOpen,category,setCategory}}>
      {children}
    </FormDataContext.Provider>
  );
};
UserFormData.propTypes = {
  children: PropTypes.node.isRequired,
};