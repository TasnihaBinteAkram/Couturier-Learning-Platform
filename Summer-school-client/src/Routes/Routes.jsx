import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut.jsx/Main";
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import DashBoard from "../LayOut.jsx/DashBoard";
import AddClass from "../Dashboard/Instructor/AddClass";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";
import AddedClasses from "../Dashboard/Instructor/AddedClasses";
import AllClasses from "../Pages/Classes/AllClasses";
import SelectedCourses from "../Dashboard/Student/SelectedCourses";
import Payment from "../Dashboard/Student/Payment";
import EnrolledCourses from "../Dashboard/Student/EnrolledCourses";
import PaymentHistory from "../Dashboard/Student/PaymentHistory";
import Instructors from "../Pages/Instructors/Instructors";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../Dashboard/Admin/ManageClasses";
import SendFeedBack from "../Dashboard/Admin/SendFeedBack";
import StudentRoute from "./StudentRoute";
import CourseDetails from "../Pages/CourseDetails";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/classes',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/course/:name/:id',
                element: <CourseDetails></CourseDetails> 
            },
            {
                path:'/sendfeedback/:id',
                element: <AdminRoute><SendFeedBack></SendFeedBack></AdminRoute>
            },

        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/dashboard/addclass',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path:'/dashboard/addedclasses',
                element: <InstructorRoute><AddedClasses></AddedClasses></InstructorRoute>
            },
            {
                path:'/dashboard/manageusers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path:'/dashboard/manageclasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },


            //student routes
            {
                path:'/dashboard/selectedcourses',
                element: <StudentRoute><SelectedCourses></SelectedCourses></StudentRoute>

            },
            {
                path:'/dashboard/payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>

            },
            {
                path:'/dashboard/enrolledcourses',
                element: <StudentRoute><EnrolledCourses></EnrolledCourses></StudentRoute>,
            },
            {
                path:'/dashboard/paymenthistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
            },

        ]
    }
])

