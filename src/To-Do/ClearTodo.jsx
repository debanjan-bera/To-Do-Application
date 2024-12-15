import './todo.css'
export const ClearAllTask = ({onTodoData})=>{
    const handleClearAll = ()=>{
        onTodoData([])
      }
    return(
        <button onClick={handleClearAll}>Clear</button>
    )
}