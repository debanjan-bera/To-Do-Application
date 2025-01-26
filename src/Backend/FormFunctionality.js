import { genaratedUniqueId } from "./LocalStorage";

export const handleFromSubmit = (data,taskArr,setTaskArr,setWindowClose,setOk) => {
  const {content, group, description} = data;
  const id = genaratedUniqueId()
  const favourite = false
  const checked = false
  if (!content) return;
  const ifTododMatchedId = taskArr.find((currentTask) => currentTask.id === id);
  const ifTododMatchedContent = taskArr.find((currentTask) => currentTask.content === content);
  if (ifTododMatchedId && ifTododMatchedContent) return;
  setTaskArr((prevTask) => [...prevTask,{ id, content, group, description, favourite, checked },]);
  setOk(false);
  setWindowClose(false);
};
export const handleFormCancel = (setWindowClose, setOk) => {
  setWindowClose(() => false);
  setOk(false);
};