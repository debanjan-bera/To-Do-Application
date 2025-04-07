import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import AppLayout from '../AppLayout'
import { TaskActionItem } from '../To-Do/CompletedTask'
import useIsMobile from '../Components/Functions/UseIsMobile'
import MobileComponent from '../Dashborad/MobileDashBoard'
import { MCalendarComponent } from '../Components/layout/Calendar/MobileCalendar'
import { DashBoard } from '../Dashborad/DaashBoard'
import { TaskManager } from '../Dashborad/TaskManager'

 function RouterCompo() {
  // const isMobile = useIsMobile(570);  // Check mobile screen width
  // const LayoutComponent = isMobile ? <MobileComponent /> : <DashBoard />;  // Store JSX in a variable
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />,
      children: [
        { path: '/', element: <TaskManager /> },
        { path: '/completedTask', element: <TaskActionItem /> },
        { path: '/calendar', element: <MCalendarComponent /> },
        { path: '*', element: <TaskManager /> } // Redirect unknown routes to home
      ],
    },
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo
