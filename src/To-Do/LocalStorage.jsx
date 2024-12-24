const todoKey = 'TodoItems'
export const getLocalStorage = ()=>{
    const rawData = localStorage.getItem(todoKey)
    if(!rawData) return [];
    return JSON.parse(rawData)
}
export const setLocalStorage = (currentTask)=>{
    localStorage.setItem(todoKey, JSON.stringify(currentTask))
}
export const genaratedUniqueId = () =>{
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString();
    const formattedTime = todayDate.toLocaleTimeString();
    return formattedDate +'&'+ formattedTime;
}

export const updatedTodayDate= ()=>{
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString();
    return formattedDate
}