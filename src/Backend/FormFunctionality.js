import { genaratedUniqueId } from "./LocalStorage";

export const taskId = genaratedUniqueId()

      export const handleFromInput = (event,setInputValue,) => {
        const { name, value } = event.target;
        name === 'content' ? setInputValue((prevData) => ({ ...prevData, [name]: value,id:taskId })): 
        setInputValue((prevData) => ({ ...prevData, [name]: value }));
      };

      export const handleFromSubmit = (e,inputValue,taskArr,setTaskArr,setInputValue,setWindowClose,setOk) => {
        const {id,content,groupName,description,favourite,checked} = inputValue
        e.preventDefault();
        if (!content) return;
        const ifTododMatchedId = taskArr.find((currentTask) => currentTask.id === id)
        const ifTododMatchedContent = taskArr.find((currentTask) => currentTask.content === content)
        if (ifTododMatchedId && ifTododMatchedContent) return;
        setTaskArr((prevTask) => [...prevTask,{id,content,groupName,description,favourite,checked}]);
        setInputValue({id:'',content:'',groupName:'',description:'',favourite:false,checked:false});
        setOk(false)
        setWindowClose(false)
      };
export const handleFormCancel = (setWindowClose, setOk) => {
  setWindowClose(() => false);
  setOk(false);
};