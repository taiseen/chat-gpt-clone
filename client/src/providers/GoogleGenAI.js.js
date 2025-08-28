import { GoogleGenAI } from "@google/genai";

const safetySettings = [
    {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_LOW_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_LOW_AND_ABOVE",
    },
];

const googleAi = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_PUBLIC_KEY });

const aiModel = async (prompt) => {

    const response = await googleAi.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: { safetySettings },
    });

    // console.log(response.text);
    
    return response;
}

export default aiModel;