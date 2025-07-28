import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useChatInput = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createChat = useMutation({
        mutationFn: async (text) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ text }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create chat");
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Chat creation failed:", error);
                throw error;
            }
        },

        onSuccess: (chatId) => {
            queryClient.invalidateQueries({ queryKey: ["userChats"] });
            navigate(`/dashboard/chats/${chatId}`);
        },
    });

    return { createChat };
};
