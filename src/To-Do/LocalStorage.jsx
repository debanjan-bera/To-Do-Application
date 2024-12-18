const todoKey = 'TodoItems'
export const getLocalStorage = ()=>{
    const rawData = localStorage.getItem(todoKey)
    if(!rawData) return [];
    return JSON.parse(rawData)
}
export const setLocalStorage = (currentTask)=>{
    localStorage.setItem(todoKey, JSON.stringify(currentTask))
}