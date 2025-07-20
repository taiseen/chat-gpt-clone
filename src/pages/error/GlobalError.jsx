import { useRouteError } from "react-router-dom";

const GlobalError = () => {
    const error = useRouteError();

    console.error(error);

    return (
        <div className="p-10 text-center text-red-400">
            <h1 className="text-3xl font-bold mb-4">🚨 Unexpected Error</h1>
            <p className="text-xl text-yellow-500">{error?.message || "Something went wrong."}</p>
        </div>
    );
}

export default GlobalError
