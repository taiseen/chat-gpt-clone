import { useEffect, useRef, useState } from "react";
import { IKImage } from "imagekitio-react";
import ImgUploader from "./ImgUploader";
import config from "../config";
import aiModel from "../providers/GoogleGenAI.js.js";


const ChatInput = ({ data = [] }) => {

    const formRef = useRef(null);
    const scrollToBottom = useRef(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    useEffect(() => {
        scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }, [data, question, answer, img.dbData]);


    const add = async () => {


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prompt = "write a short story about AI";
        console.log("🚀 ~ file: ChatInput.jsx:53 ~ handleSubmit ~ data:", prompt);

        const data = await aiModel(prompt);
        console.log(data.text);
        console.log(data);


        const text = e.target.text.value;
        if (!text) return;

        // createChat.mutate(text);
    };


    return (
        <div className="form-wrapper mx-auto">

            <div>
                {img.isLoading && <div className="text-green-500">Loading...</div>}
                {
                    // display image at UI
                    img.dbData.filePath &&
                    <IKImage
                        path={img.dbData.filePath}
                        urlEndpoint={config.urlEndpoint}
                        transformation={[{ width: "380" }]}
                        width={380}
                    />
                }
            </div>
            <div className="endChat" ref={scrollToBottom} />


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