import { useParams } from "react-router-dom";

const Chat = () => {

    const { id } = useParams();

    return (
        <div className="h-full text-2xl">
            Chat 101 - {id}
        </div>
    )
}

export default Chat