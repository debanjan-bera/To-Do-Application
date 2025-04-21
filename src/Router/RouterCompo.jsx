import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  MCalendarComponent  from '../Components/layout/Calendar/MobileCalendar'
import  DashBoard  from '../Dashborad/DaashBoard'
import Home from '../Dashborad/Home'

import  TaskManager  from '../Pages/TaskManager/TaskManager'
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
        { path: '/todo', element: <TaskManager isCompletedDashBoard={false}/> },
        {path: '/home', element: <Home/>},
        { path: '/todo/:category', element: <TaskManager isCompletedDashBoard={false} /> },
      ],
    },
    // {
    //   path: '/sa',
    //   element: <ContributionGraph/>
    // },
    { path: '*', element: <NoFound/> }
  ]);
  
return <RouterProvider router={router}/>
}
export default RouterCompo
