import { Link } from "react-router-dom";
import links from "../../routes/links";

const UrlNotFound = () => {

    return (
        <div className="text-center mt-10 text-red-500">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>

            <p className="mt-2">The page you are looking for doesn't exist.</p>

            <Link to={links.root} className="text-blue-500 hover:underline mt-2">Go to Home</Link>
        </div>
    );
}

export default UrlNotFound
