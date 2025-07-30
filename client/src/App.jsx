import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";
import router from "./routes";

const App = () => {

    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App
