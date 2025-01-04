import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AllItems from "../pages/AllItems";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddItem from "../pages/AddItem";
import PrivateRoute from "./PrivateRoute";
import AllRecoveredItems from "../pages/AllRecoveredItems";
import MyItems from "../pages/MyItems";
import PostDetails from "../pages/PostDetails";
import UpdatePost from '../pages/UpdatePost';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: 'allItems',
                    element: <AllItems />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                },
                {
                    path: 'addItem',
                    element: <PrivateRoute>
                        <AddItem />
                    </PrivateRoute>
                },
                {
                    path: 'details/:id',
                    element: <PrivateRoute>
                        <PostDetails />
                    </PrivateRoute>
                },
                {
                    path: 'allRecovered',
                    element: <PrivateRoute>
                        <AllRecoveredItems />
                    </PrivateRoute>
                },
                {
                    path: 'myItems',
                    element: <PrivateRoute>
                        <MyItems />
                    </PrivateRoute>
                },
                {
                    path: 'update/:id',
                    element: <PrivateRoute>
                        <UpdatePost />
                    </PrivateRoute>
                }
            ]
        }
    ]
)


export default router;