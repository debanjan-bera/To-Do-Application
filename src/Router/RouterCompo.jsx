import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  MCalendarComponent  from '../Components/layout/Calendar/MobileCalendar'
import { DashBoard } from '../Dashborad/DaashBoard'
import  TaskManager  from '../Components/TaskManager/TaskManager'

 function RouterCompo() {  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />,
      children: [
        { path: '/', element: <TaskManager isCompletedDashBoard={false}/> },
        { path: '/completedTask', element: <TaskManager isCompletedDashBoard={true} /> },
        { path: '/calendar', element: <MCalendarComponent /> },
        { path: '*', element: <TaskManager isCompletedDashBoard={false}/> } // Redirect unknown routes to home
      ],
    },
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo
