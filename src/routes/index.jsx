import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";

const GlobalError = lazy(() => import("../pages/error/GlobalError"));
const UrlNotFound = lazy(() => import("../pages/error/UrlNotFound"));
const SignInPage = lazy(() => import("../pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("../pages/auth/SignUpPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
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
                { path: "/sign-in/*", element: <SignInPage /> },
                { path: "/sign-up/*", element: <SignUpPage /> },
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