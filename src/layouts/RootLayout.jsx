import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <div>
            <div className="text-3xl font-bold underline">Root Layout</div>

            <Outlet /> {/* renders nested children */}
        </div>
    )
}

export default RootLayout
