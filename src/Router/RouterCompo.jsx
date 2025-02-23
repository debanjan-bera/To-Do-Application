import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import AppLayout from '../AppLayout'
import { TaskActionItem } from '../To-Do/CompletedTask'
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
      ]
    }])
return <RouterProvider router={router}/>
}
export default RouterCompo