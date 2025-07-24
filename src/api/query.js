import { useQuery } from "@tanstack/react-query";

export const useGetChatList = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat-list`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return await response.json();
        },
    });

    return { isPending, error, data };
};