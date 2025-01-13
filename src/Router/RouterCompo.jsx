import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import { AddTaskForm } from '../To-Do/Functional Component/PopUp/AddTask'
import AppLay from '../TodoAppLayout'
 function RouterCompo() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLay/>,
    //   errorElement: <ErrorPage/>,
      children:[
        {
          path:'/',
          element: <TodoApp/>
        },
        {
          path:'/login',
          element: <AddTaskForm />
        }
      ]
    }
    
  ])
return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}


export default RouterCompo