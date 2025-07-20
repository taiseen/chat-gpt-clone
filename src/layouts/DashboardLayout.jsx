import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../components/ChatList";


const DashboardLayout = () => {

    const { userId, isLoaded } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate]);

    if (!isLoaded) return "Loading...";


    return (
        <div className="flex gap-12 h-full pt-5">

            <div className="flex-1/4">
                <ChatList />
            </div>

            <div className="flex-3/4 bg-slate-900">
                {/* renders nested children */}
                <Outlet />
            </div>
        </div>
    )
}


export default DashboardLayout
