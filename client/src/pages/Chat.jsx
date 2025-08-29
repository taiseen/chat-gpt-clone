import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import aiModel from "../providers/GoogleGenAI.js";
import ChatInput from "../components/ChatInput";
import Markdown from "react-markdown";
import config from "../config";


const imgDefaultState = {
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
}

const Chat = () => {

    const { id } = useParams();

    const path = useLocation().pathname;
    const chatId = path.split("/").pop();

    const url = `${config.apiUrl}/api/chats/${chatId}`;

    const { isPending, error, data } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () =>
            fetch(url, { credentials: "include" }).then((res) => res.json()),
    });

    const scrollToBottom = useRef(null);
    const formRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [img, setImg] = useState(imgDefaultState);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const userInput = e.target.text.value;
        if (!userInput) return;
        setQuestion(userInput);

        try {
            const response = await aiModel(userInput, img.aiData);

            setImg(imgDefaultState); // reset image state for next img upload...
            setIsLoading(false);

            // Check if response has text property
            if (response && response.text) {
                simulateStreaming(response.text);
            } else {
                console.error("Unexpected response format:", response);
                setAnswer("Sorry, I couldn't process that request.");
            }
        } catch (err) {
            console.error("Error generating AI response:", err);
            setIsLoading(false);
            setAnswer("Something went wrong! Please try again.");
        }
    };

    const simulateStreaming = (fullText) => {
        let i = 0;
        setAnswer(""); // reset
        const interval = setInterval(() => {
            setAnswer((prev) => prev + fullText[i]);
            i++;
            if (i >= fullText.length) clearInterval(interval);
        }, 5); // 5ms per character
    };


    useEffect(() => {
        scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }, [data, question, answer, img.dbData]);

    return (
        <div className="h-full flex flex-col items-center relative">
            <div className="w-full flex-1 flex justify-center overflow-auto customScrollbar">
                <div className="w-full flex flex-col gap-4 px-2">

                    {question && (
                        <div className="self-end bg-slate-600 max-w-[80%] rounded p-2">
                            {question}
                        </div>
                    )}

                    {isLoading && (
                        <div className="self-start size-8 border-2 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                    )}


                    {answer && (
                        <div className="self-start bg-slate-600 max-w-[80%] rounded p-2">
                            <Markdown>{answer}</Markdown>
                        </div>
                    )}

                    {/* 
                        <div className="self-end bg-slate-600 max-w-[80%] rounded p-2">user</div>
                        <div className="self-start bg-slate-600 max-w-[80%] rounded p-2">ai model</div> 
                    */}

                    <div>
                        {img.isLoading && <div className="text-green-500">Loading...</div>}
                        {
                            // display image at UI
                            img.dbData.filePath &&
                            <IKImage
                                width={380}
                                path={img.dbData.filePath}
                                urlEndpoint={config.urlEndpoint}
                                transformation={[{ width: "380" }]}
                            />
                        }
                    </div>

                    <div className="endChat" ref={scrollToBottom} />

                    {/* {isPending ? (
                        "Loading..."
                    ) : error ? (
                        "Something went wrong!"
                    ) : (
                        data?.history?.map((message, i) => (
                            <div key={i}>
                                {message.img && (
                                    <IKImage
                                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                        transformation={[{ height: 300, width: 400 }]}
                                        lqip={{ active: true, quality: 20 }}
                                        path={message.img}
                                        loading="lazy"
                                        height="300"
                                        width="400"
                                    />
                                )}

                                <div
                                    className={`p-5 max-w-[80%] 
                                    ${message.role === "user"
                                            ? "bg-[#2c2937] rounded-2xl self-end"
                                            : ""
                                        }`}
                                >
                                    <Markdown>{message.parts[0].text}</Markdown>
                                </div>
                            </div>
                        ))
                    )}

                    {data && <NewPrompt data={data} />} */}

                    <ChatInput onSubmit={handleSubmit} setImg={setImg} />
                </div>
            </div>
        </div>
    );
}

export default Chat