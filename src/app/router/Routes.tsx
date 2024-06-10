import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/details/ActivityForm.tsx";
import ActivityDetails from "../../features/activities/details/ActivityDetails.tsx";

export const routes: RouteObject[]=[
    {
        path:"/",
        element:<App/>,
        children:[
            {path:'', element: <HomePage/>},
            {path:'activities', element: <ActivityDashboard/>},
            {path:'activities/:id', element: <ActivityDetails/>},
            {path:'createActivity', element: <ActivityForm key='create'/>},
            {path:'manage/:id', element: <ActivityForm key='manage'/>},
        ]
    }
]

export const router = createBrowserRouter(routes);