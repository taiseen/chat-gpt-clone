import { useUpdateChatMessage } from "../api/mutation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import { getChatById } from "../api/query";
import generateContentStream from "../providers/GoogleGenAI";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatInput from "../components/ChatInput";
import Markdown from "react-markdown";
import config from "../config";

const imgDefaultState = {
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
};

const Chat = () => {
    const { id: chatId } = useParams();

    const { isPending, error, data } = getChatById(chatId);
    const { updateChat } = useUpdateChatMessage(chatId);

    const [messages, setMessages] = useState([]); // Local state for streaming
    const [img, setImg] = useState(imgDefaultState);
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef(null);
    const scrollToBottom = useRef(null);

    // Sync backend history to local messages on load/update
    useEffect(() => {
        if (data?.history) {
            setMessages(data.history);
        }
    }, [data]);

    console.log(data);


    useEffect(() => {
        // Only run once on mount, after data loads
        if (!data?.history || messages.length > 0) return;

        // Set initial messages from history
        setMessages(data.history);

        // Check if last message is from user → AI should respond
        const lastMsg = data.history.at(-1);
        if (lastMsg?.role === "user") {
            const userText = lastMsg.parts[0]?.text;
            const hasImage = !!lastMsg.img;

            // Find image data if exists (from history)
            const imgFromHistory = hasImage
                ? data.history.find((m) => m.img)?.img // or store img in a better way
                : null;

            // Simulate AI response automatically
            const autoRespond = async () => {
                setIsLoading(true);
                let aiResponse = "";

                try {
                    // If image was part of message, pass it to AI
                    const imgData = imgFromHistory
                        ? { filePath: imgFromHistory } // or reconstruct image data
                        : null;

                    const stream = await generateContentStream(userText, imgData);
                    setMessages((prev) => [
                        ...prev,
                        { role: "model", parts: [{ text: "" }] },
                    ]);

                    for await (const chunk of stream) {
                        const text = chunk?.text || "";
                        aiResponse += text;
                        setMessages((prev) => {
                            const msgs = [...prev];
                            msgs[msgs.length - 1].parts[0].text += text;
                            return msgs;
                        });
                    }

                    // ✅ Now save to backend
                    updateChat({
                        question: userText,
                        answer: aiResponse,
                        img: imgData, // if needed
                    });
                } catch (err) {
                    console.error("AI stream failed:", err);
                    setMessages((prev) => {
                        const msgs = [...prev];
                        msgs[msgs.length - 1].parts[0].text = "Sorry, I couldn't process that.";
                        return msgs;
                    });
                } finally {
                    setIsLoading(false);
                }
            };

            autoRespond();
        }
    }, [data, messages.length]); // ← watch data and messages

    // Auto-scroll
    useEffect(() => {
        scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, img.dbData, img.aiData, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.text.value.trim();
        if (!userInput || isLoading) return;

        setIsLoading(true);

        // Add user message (with image if exists)
        const userMsg = {
            role: "user",
            parts: [{ text: userInput }],
            ...(img.dbData?.filePath && { img: img.dbData.filePath }),
        };
        setMessages((prev) => [...prev, userMsg]);


        let aiResponse = "";
        try {
            const stream = await generateContentStream(userInput, img.aiData);
            setMessages((prev) => [...prev, { role: "model", parts: [{ text: "" }] }]);

            for await (const chunk of stream) {
                const text = chunk?.text || "";
                aiResponse += text;
                setMessages((prev) => {
                    const msgs = [...prev];
                    msgs[msgs.length - 1].parts[0].text += text;
                    return msgs;
                });
            }

            // ✅ Mutation: now save new Q&A to backend
            updateChat({
                question: userInput,
                answer: aiResponse,
                img: img.dbData,
            });

            // ✅ Only reset input field, NOT the image
            formRef.current.reset();

            // Optional: Clear image only if you want
            // setImg(imgDefaultState); // ← Uncomment only if desired

        } catch (err) {
            // Handle error without clearing image
            setMessages((prev) => {
                const msgs = [...prev];
                msgs[msgs.length - 1].parts[0].text = "Sorry, I couldn't process that.";
                return msgs;
            });
            formRef.current.reset();
        } finally {
            setIsLoading(false);
        }
    };

    if (isPending) return <div>Loading chat...</div>;
    if (error) return <div>Error loading chat.</div>;

    return (
        <div className="h-full flex flex-col items-center relative ">
            <div className="w-full flex-1 flex justify-center overflow-auto customScrollbar">
                <div className="w-full flex flex-col gap-4 px-2">

                    {/* Render chat history */}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 max-w-[80%] rounded-xl flex flex-col gap-2  
                            ${msg.role === "user"
                                    ? "bg-[#2c2937] self-end"
                                    : "bg-gray-700 self-start"
                                }
                                `}
                        >
                            {/* ✅ Show image from message history */}
                            {msg.img && (
                                <IKImage
                                    urlEndpoint={config.imgUrlEndpoint}
                                    path={msg.img || img.dbData.filePath}
                                    transformation={[{ width: 400 }]}
                                    lqip={{ active: true }}
                                    loading="lazy"
                                    width="400"
                                    height={"400"}
                                    className="rounded-md max-h-60 object-contain"
                                />
                            )}
                            {/* Text */}
                            <div className="whitespace-pre-wrap">
                                <Markdown>{msg.parts[0].text}</Markdown>
                            </div>
                        </div>
                    ))}

                    {/* Show image preview: from local base64 first, then from ImageKit */}
                    {/* {img.aiData?.inlineData && (
                        <div className="mb-2 relative w-fit">
                            <img
                                src={`data:${img.aiData.inlineData.mimeType};base64,${img.aiData.inlineData.data}`}
                                alt="Uploaded preview"
                                className="max-h-60 rounded object-contain"
                                style={{ maxHeight: "240px", maxWidth: "100%" }}
                            />

                            <button
                                type="button"
                                onClick={() => setImg(imgDefaultState)}
                                className="text-red-500 hover:text-red-700 text-lg absolute top-0 right-0 cursor-pointer"
                                title="Remove image"
                            >
                                ✕
                            </button>
                        </div>
                    )} */}

                    {/* Once uploaded, show from ImageKit */}
                    {img.dbData?.filePath && (
                        <IKImage
                            urlEndpoint={config.imgUrlEndpoint}
                            path={img.dbData.filePath}
                            transformation={[{ width: 400, height: 300 }]}
                            lqip={{ active: true }}
                            loading="lazy"
                            width="400"
                            height="300"
                            className="mb-2 rounded"
                        />
                    )}


                    {/* Loading spinner during AI response */}
                    {isLoading && (
                        <div className="self-start bg-gray-700 p-3 rounded-xl max-w-[80%]">
                            <LoadingSpinner />
                        </div>
                    )}

                    <div ref={scrollToBottom} />
                </div>
            </div>

            {/* Input Form */}
            <ChatInput onSubmit={handleSubmit} setImg={setImg} formRef={formRef} />
        </div>
    );
};

export default Chat;