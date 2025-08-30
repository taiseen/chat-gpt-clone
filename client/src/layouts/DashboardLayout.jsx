import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatList from "../components/ChatList";
import links from "../routes/links";


const DashboardLayout = () => {

    const { userId, isLoaded } = useAuth();

    const navigate = useNavigate();


    useEffect(() => {
        if (isLoaded && !userId) {
            navigate(links.signIn);
        }
    }, [isLoaded, userId, navigate]);


    return (
        <div className="flex gap-3 h-full pt-2">

            <div className="flex-2/12">
                <ChatList />
            </div>

            <div className="flex-10/12 border-l borderStyle">
                {/* renders nested children */}
                {
                    isLoaded
                        ? <Outlet />
                        : <div className="flex items-center justify-center">
                            <LoadingSpinner />
                        </div>
                }
            </div>
        </div>
    )
}


export default DashboardLayout
