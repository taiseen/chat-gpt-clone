import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import ChatInput from "../components/ChatInput";
import config from "../config";

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

    console.log(data);

    // return (
    //     <div className="h-full text-2xl">
    //         Chat 101 - {id}
    //     </div>
    // )

    return (
        <div className="h-full flex flex-col items-center relative">
            <div className="w-full flex-1 flex justify-center overflow-auto customScrollbar">
                <div className="flex flex-col gap-4 px-2 ">

                    <div className="self-start bg-slate-600 max-w-[80%] rounded p-2">Test message</div>

                    <div className="self-end bg-slate-600 max-w-[80%] rounded p-2">User input...</div>
                    <div className="self-end bg-slate-600 max-w-[80%] rounded p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati, est blanditiis laudantium porro sunt necessitatibus aperiam iure dignissimos ad?</div>

                    <div className="self-start bg-slate-600 max-w-[80%] rounded p-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus laboriosam impedit ipsa, accusantium libero magni voluptatibus quidem hic eum deleniti dolores commodi aut sint sed ab sequi blanditiis distinctio iusto eaque aspernatur. Pariatur veritatis commodi corporis corrupti, quod sed in nostrum velit accusamus praesentium itaque, soluta numquam nemo, minima qui.</div>




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

                    <ChatInput />
                </div>
            </div>
        </div>
    );
}

export default Chat