const todoKey = 'TodoItems'
const todoFilter = 'todoFilterItems'
export const getLocalStorage = ()=>{
    const rawData = localStorage.getItem(todoKey)
    if(!rawData) return [];
    return JSON.parse(rawData)
}
export const getFilteredLocalStorage = ()=>{
    const rawData = localStorage.getItem(todoFilter)
    if(!rawData) return [];
    return JSON.parse(rawData)
}
export const setLocalStorage = (currentTask,filteredData)=>{
    localStorage.setItem(todoKey, JSON.stringify(currentTask))
    localStorage.setItem(todoFilter, JSON.stringify(filteredData))
}
export const genaratedUniqueId = () =>{
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString();
    const formattedTime = todayDate.toLocaleTimeString();
    return formattedDate +'&'+ formattedTime;
}

export const updatedTodayDate= (id)=>{
    const [datePart] = id.split('&');
    return datePart;
}