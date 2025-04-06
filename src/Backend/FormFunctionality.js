import { createdDate } from "./DateMethod";
import { genaratedUniqueId } from "./LocalStorage";

export const handleFromSubmit = (data,taskArr,setTaskArr,setWindowClose,setmobileAddButton) => {
  const {content, group, priority, description} = data;
  const id = genaratedUniqueId()
  const favourite = false;
  const checked = false;
  const status = 'Pending'
  const createdDateForform = createdDate() 
  if (!content) return;
  const ifTododMatchedId = taskArr.find((currentTask) => currentTask.id === id);
  const ifTododMatchedContent = taskArr.find((currentTask) => currentTask.content === content);
  if (ifTododMatchedId && ifTododMatchedContent) return;
  setWindowClose(false);
  setmobileAddButton(false)
  setTaskArr((prevTask) => [...prevTask,{ id, content, group, description, favourite, checked, status, priority,createdDateForform}]);
};
export const handleFormCancel = (setWindowClose,setmobileAddButton) => {
  setWindowClose(false);
  setmobileAddButton(false)
};