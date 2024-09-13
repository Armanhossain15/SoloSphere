import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import JobDetails from "../Pages/JobDetails/JobDetails";
import Addjobs from "../Pages/AddJobs/Addjobs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import UpdateJob from "../Pages/UpdateJob/UpdateJob";




const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/addjobs',
                element: <Addjobs/>
            },
            {
                path: '/my_Posted_Jobs',
                element: <MyPostedJobs/>
            },
            {
                path: '/job/:id',
                element: <JobDetails/>,
                loader: ({params})=>fetch(`http://localhost:9000/job/${params.id}`)
            },
            {
                path: '/update/:id',
                element: <UpdateJob/>,
                loader: ({params})=>fetch(`http://localhost:9000/job/${params.id}`)
            },

        ]
    }
])
export default Routes;