import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";

const GlobalError = lazy(() => import("../pages/error/GlobalError"));
const UrlNotFound = lazy(() => import("../pages/error/UrlNotFound"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import("../pages/Chat"));


const router = createBrowserRouter(
    [
        {
            element: <RootLayout />, // 🔁 Top-level layout (e.g. navbar, footer)
            // 📌 Must use <Outlet /> inside RootLayout to render nested routes

            errorElement: <GlobalError />, // ✅ Handles unexpected runtime errors gracefully

            children: [
                { path: "/", element: <Home /> },
                { path: "/sign-in/*", element: <SignIn /> },
                { path: "/sign-up/*", element: <SignUp /> },
                {
                    element: <DashboardLayout />, // 🧩 Nested layout for /dashboard
                    // 📌 Must use <Outlet /> inside DashboardLayout to render children
                    children: [
                        { path: "/dashboard", element: <Dashboard /> },
                        { path: "/dashboard/chats/:id", element: <Chat /> },
                    ],
                },
            ],
        },

        // 🚨 Catch-all 404 route (must be outside main layout tree)
        { path: "*", element: <UrlNotFound />, },
    ]
);


export default router;