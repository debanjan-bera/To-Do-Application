import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import AppLayout from '../AppLayout'
import { TaskActionItem } from '../To-Do/CompletedTask'
import { CalenderComponent } from '../Components/layout/Calender/Calender'
import useIsMobile from '../Components/Functions/UseIsMobile'
import MobileComponent from '../Dashborad/MobileDashBoard'

 function RouterCompo() {
  const isMobile = useIsMobile(500);  // Check mobile screen width
  const LayoutComponent = isMobile ? <MobileComponent /> : <AppLayout />;  // Store JSX in a variable
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: LayoutComponent,  // Use computed JSX here
      children: [
        { path: '/', element: <TodoApp /> },
        { path: '/completedTask', element: <TaskActionItem /> },
        { path: '/calender', element: <CalenderComponent /> }
      ],
    },
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo