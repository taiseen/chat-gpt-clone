import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import api from ".";


export const getChatList = () => {

    const { userId } = useAuth(); // Access the userId from the clerk useAuth hook

    const { isPending, error, data } = useQuery({
        queryKey: ["chat-titles"],

        queryFn: async () => {
            try {
                const response = await api.get("/api/chat-titles");
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "🟥🟥🟥 Network response was not ok");
            }
        },
        
        enabled: !!userId, // Enable the query only when userId is provided
    });

    return { isPending, error, data };
};


export const getChatById = (chatId) => {

    const { isPending, error, data } = useQuery({
        queryKey: ["chatById", chatId],

        queryFn: async () => {
            try {
                const response = await api.get(`/api/chat/${chatId}`);
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "🟥🟥🟥 Failed to fetch chat");
            }
        },

        enabled: !!chatId, // Enable the query only when chatId is provided
    });

    return { isPending, error, data };
};