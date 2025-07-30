import { useEffect, useRef, useState } from "react";
import ImgUploader from "./ImgUploader";
import { IKImage } from "imagekitio-react";
import config from "../config";


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

    // img?.dbData?.filePath &&
    // <IKImage
    //     path={img.dbData.filePath}
    //     urlEndpoint={config.urlEndpoint}
    // />

    return (
        <div className="form-wrapper mx-auto">

            <div className="endChat" ref={endRef} />

            <form onSubmit={handleSubmit} className="form">

                <input
                    type="text"
                    name="text"
                    placeholder="Ask me anything..."
                    className="input-field"
                />

                <div className="flex gap-2">
                    <ImgUploader setImg={setImg} />

                    <button className="submit-btn">
                        <img src="/img/arrow.png" alt="submit" className="submit-btn-icon" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatInput