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
        <div className="flex gap-3 h-full pt-5">

            <div className="flex-2/12">
                <ChatList />
            </div>

            <div className="flex-10/12 ">
                {/* renders nested children */}
                <Outlet />
            </div>
        </div>
    )
}


export default DashboardLayout
