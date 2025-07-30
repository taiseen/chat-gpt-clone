import { Link } from 'react-router-dom';

const DemoChatTitle = () => {
    return Array.from({ length: 50 }).map((_, index) => (
        <Link
            className="p-2.5 rounded-md hover:bg-slate-700 transition-colors"
            to={`/dashboard/chats/${index + 1}`} key={index}>
            Test chat title... {index + 1}
        </Link>
    ))
}

export default DemoChatTitle