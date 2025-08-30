// import DemoChatTitle from "./DemoChatTitle";
import LoadingSpinner from "./LoadingSpinner";
import links from "../routes/links";
import { getChatList } from "../api/query";
import { Link } from "react-router-dom";

const ChatList = () => {

    const { isPending, error, data } = getChatList();

    return (
        <div className="h-full flex flex-col">

            <div className="flex flex-col gap-1 mb-2 pb-2 border-b borderStyle">
                <Link to="/dashboard" className="font-bold py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-center text-slate-200 font-light rounded">Create a new Chat</Link>
            </div>

            <div className="flex flex-col overflow-y-auto customScrollbar">
                {isPending
                    ? <LoadingSpinner />
                    : error
                        ? "Something went wrong!"
                        : data?.length === 0
                            ? "No chats found"
                            : data?.map((chat) => (
                                <Link
                                    className="p-2 rounded-md hover:bg-slate-700/80 transition-colors"
                                    to={`${links.chatId}${chat._id}`} key={chat._id}>
                                    {chat.title}
                                </Link>
                            ))
                }

                {/* <DemoChatTitle /> */}
            </div>

            <div className="mt-auto flex items-center gap-2">
                <img src="/img/logo.png" alt="" className="w-8 h-8" />
                <p>AI Chat App 🤖</p>
            </div>
        </div>
    );
};

export default ChatList;
