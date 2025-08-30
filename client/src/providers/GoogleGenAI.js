import { GoogleGenAI } from "@google/genai";
import config from "../config";

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

const googleAi = new GoogleGenAI({ apiKey: config.geminiKey });

// const aiModel = async (userInputData, imgObj = null) => {

//     // Build the parts array correctly
//     const parts = [];

//     // Add text part if provided
//     if (userInputData) {
//         parts.push({ text: userInputData });
//     }

//     // Add image part if provided
//     if (imgObj && imgObj.inlineData) {
//         parts.push({ inlineData: { ...imgObj.inlineData } });
//     }

//     // https://ai.google.dev/gemini-api/docs/text-generation#streaming-responses

//     const response = await googleAi.models.generateContentStream({
//         model: "gemini-1.5-flash",
//         contents: [{ parts }],
//         config: { safetySettings },
//     });

//     return response;
// }

// export default aiModel;

const generateContentStream = async (text, imgObj = null) => {
    const parts = [];

    if (text) parts.push({ text });
    if (imgObj?.inlineData) parts.push({ inlineData: imgObj.inlineData }); // for image data

    const response = await googleAi.models.generateContentStream({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts }],
        config: { safetySettings },
    });

    return response; // Return the async iterable stream
};

export default generateContentStream;