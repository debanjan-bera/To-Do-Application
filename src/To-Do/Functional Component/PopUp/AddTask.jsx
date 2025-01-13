export const AddTaskForm = ()=>{
    return(
    <section className="w-lvw h-lvh absolute top-0 left-0 bg-red-200 z-10 flex items-center justify-center">
        <form action="" className=" bg-pink-100 p-10">
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
        
    )
}