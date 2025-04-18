import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  MCalendarComponent  from '../Components/layout/Calendar/MobileCalendar'
import  DashBoard  from '../Dashborad/DaashBoard'
import  ContributionGraph  from '../Dashborad/Contribution'

import  TaskManager  from '../Pages/TaskManager/TaskManager'
import ReDahBoard from '../Dashborad/ReDahBoard';
import NoFound from '../Pages/Error/404';
 function RouterCompo() {  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />,
      children: [
        { path: '/', element: <TaskManager isCompletedDashBoard={false}/> },
        { path: '/completedTask', element: <TaskManager isCompletedDashBoard={true} /> },
        { path: '/calendar', element: <MCalendarComponent /> },
        // Redirect unknown routes to home
      ],
    },
    {
      path: '/re',
      element: <ReDahBoard/>
    },
    {
      path: '/sa',
      element: <ContributionGraph/>
    },
    { path: '*', element: <NoFound/> }
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo
