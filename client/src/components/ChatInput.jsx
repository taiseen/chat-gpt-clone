import { useEffect, useRef, useState } from "react";
import ImgUploader from "./ImgUploader";


const ChatInput = ({ data = [] }) => {

    const formRef = useRef(null);
    const endRef = useRef(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });


    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [data, question, answer, img.dbData]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if (!text) return;

        createChat.mutate(text);
    };

    return (
        <div className="form-wrapper mx-auto">

            <div className="endChat" ref={endRef} />

            <form onSubmit={handleSubmit} className="form">
                <ImgUploader setImg={setImg} />

                <label htmlFor="file" className="submit-btn">
                    <img src="/img/attachment.png" alt="" className="submit-btn-icon" />
                </label>

                <input id="file" type="file" multiple={false} hidden />

                <input
                    type="text"
                    name="text"
                    placeholder="Ask me anything..."
                    className="input-field"
                />

                <button className="submit-btn">
                    <img src="/img/arrow.png" alt="submit" className="submit-btn-icon" />
                </button>
            </form>
        </div>
    )
}

export default ChatInput