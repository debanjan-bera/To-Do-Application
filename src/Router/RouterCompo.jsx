import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoApp } from '../To-Do/ToDoApp'
import AppLayout from '../AppLayout'
import { TaskActionItem } from '../To-Do/CompletedTask'
import useIsMobile from '../Components/Functions/UseIsMobile'
import MobileComponent from '../Dashborad/MobileDashBoard'
import { MCalendarComponent } from '../Components/layout/Calendar/MobileCalendar'

 function RouterCompo() {
  const isMobile = useIsMobile(570);  // Check mobile screen width
  const LayoutComponent = isMobile ? <MobileComponent /> : <AppLayout />;  // Store JSX in a variable
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: LayoutComponent,
      children: [
        { path: '/', element: <TodoApp /> },
        { path: '/completedTask', element: <TaskActionItem /> },
        { path: '/calender', element: <MCalendarComponent /> },
        { path: '*', element: <TodoApp /> } // Redirect unknown routes to home
      ],
    },
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo
