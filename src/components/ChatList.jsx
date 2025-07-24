import { useGetChatList } from "../api/query";
import { Link } from "react-router-dom";

const ChatList = () => {

    const { isPending, error, data } = useGetChatList();

    return (
        <div className="h-full flex flex-col">

            <div className="flex flex-col gap-1 mb-2 pb-2 border-b">
                <Link to="/">Explore Lama AI</Link>
                <Link to="/dashboard" className="font-bold p-1 bg-slate-700 rounded">Create a new Chat</Link>
            </div>


            <p className="mb-2.5 font-bold">RECENT CHATS</p>

            <div className="flex flex-col overflow-y-auto">
                {isPending
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.map((chat) => (
                            <Link
                                className="p-2.5 rounded-md hover:bg-slate-800 transition-colors"
                                to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                                {chat.title}
                            </Link>
                        ))
                }
            </div>

            <div className="mt-auto flex items-center gap-2">
                <img src="/img/logo.png" alt="" className="w-8 h-8" />

                <div className="texts">
                    <p>Upgrade to Lama AI Pro</p>
                    <p>Get unlimited access to all features</p>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
