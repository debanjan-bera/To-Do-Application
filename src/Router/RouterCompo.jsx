import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import AppLayout from '../AppLayout'
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