import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import links from "../routes/links";
import api from ".";


export const createChatMessage = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { mutate: createChat } = useMutation({

        mutationFn: async (text) => {
            try {
                const response = await api.post("/api/chat-message", { text });
                return response.data;
            } catch (error) {
                console.error("🟥🟥🟥 Chat creation failed:", error);
                throw error;
            }
        },

        onSuccess: (chatId) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["chat-message"] });
            queryClient.invalidateQueries({ queryKey: ["chat-titles"] }); // ← Add this

            // redirect user to chat page by chatId
            navigate(`${links.chatId}${chatId}`);
        },
    });

    return { createChat };
};


export const useUpdateChatMessage = (chatId) => {
    const queryClient = useQueryClient();

    const { mutate: updateChat } = useMutation({

        mutationFn: async ({ question, answer, img }) => {
            try {
                const response = await api.put(`/api/chat/${chatId}`, {
                    question,
                    answer,
                    img: img?.filePath, // send only the filePath to backend
                });
                return response.data;
            } catch (error) {
                console.error("🟥🟥🟥 Chat update failed:", error);
                throw error;
            }
        },

        onSuccess: () => {
            // ✅ Invalidate the specific chat query so it refetches updated history
            queryClient.invalidateQueries({ queryKey: ["chatById", chatId] });

            // Optional: Also invalidate chat titles if needed
            // queryClient.invalidateQueries({ queryKey: ["chat-titles"] });
        },

        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });

    return { updateChat };
};