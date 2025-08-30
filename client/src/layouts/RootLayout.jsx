import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import config from "../config";

// if (!config.clerkKey) {
//     throw new Error("Missing Publishable Key");
// }

const RootLayout = () => {

    return (
        <div className="p-4 px-6 h-screen flex flex-col">

            <Header />

            <main className="flex-1 overflow-hidden">
                {/* renders nested children */}
                <Outlet />
            </main>

        </div>
    )
}

export default RootLayout
