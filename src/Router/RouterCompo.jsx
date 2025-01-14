import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import { AddTaskForm } from '../To-Do/Functional Component/PopUp/AddTask'
import AppLayout from '../TodoAppLayout'
import { Home } from '../Home'
 function RouterCompo() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
    //   errorElement: <ErrorPage/>,
      children:[
        {
          path:'/',
          element: <TodoApp/>
        },
        {
          path:'/ho',
          element: <Home/>
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