import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import AppLayout from '../AppLayout'
import { TaskActionItem } from '../To-Do/CompletedTask'
import Login from '../Components/Login'
 function RouterCompo() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
    //   errorElement: <ErrorPage/>,
      children:[
        {
          path:'/', element: <TodoApp/>
        },
        {
          path:'/completedTask', element: <TaskActionItem/>
        },
        {
          path:'/login', element: <Login/>
        },
      ]
    }])
return <RouterProvider router={router}/>
}
export default RouterCompo