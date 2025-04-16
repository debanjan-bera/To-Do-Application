// import { createdDate } from "./DateMethod";
import { genaratedUniqueId } from "./LocalStorage";

export const handleFromSubmit = (data,taskArr,setTaskArr) => {
  const {content, group, priority, description,createdDateForform,favourite,checked,status} = data;
  const id = genaratedUniqueId()

  if (!content) return;
  const ifTododMatchedId = taskArr.find((currentTask) => currentTask.id === id);
  const ifTododMatchedContent = taskArr.find((currentTask) => currentTask.content === content);
  if (ifTododMatchedId && ifTododMatchedContent) return;

  setTaskArr((prevTask) => [...prevTask,{ id, content, group, description, favourite, checked, status, priority,createdDateForform}]);
};
export const handleFormCancel = (setWindowClose,setmobileAddButton,setTaskEdit) => {
  setWindowClose(false);
  setmobileAddButton(false)
  setTaskEdit(null)
};