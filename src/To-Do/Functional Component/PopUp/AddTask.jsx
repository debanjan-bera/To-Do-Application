export const AddTaskForm = ()=>{
    return(
    <section className="h-lvh w-lvh bg-white flex items-center justify-center">
        <section>
        <form action="" className="bg-pink-100 p-10">
            <label htmlFor="">
                <p>Task:</p>
                <input type="text" placeholder="Add your importent Task..."/>
            </label>
            <label htmlFor="">
                <p>Description:</p>
                <input type="text" placeholder="Add your importent description for Task..."/>
            </label>
        </form>
    </section>
    </section>
        
    )
}