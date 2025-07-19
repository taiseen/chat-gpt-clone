import { useParams } from "react-router-dom";

const Chat = () => {

    const { id } = useParams();

    return (
        <div>Chat 101 - {id}</div>
    )
}

export default Chat