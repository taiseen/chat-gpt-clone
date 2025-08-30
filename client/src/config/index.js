const config = {
    apiUrl: import.meta.env.VITE_API_URL,
    imgUrlEndpoint: import.meta.env.VITE_IMAGE_KIT_ENDPOINT,
    publicKey: import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY,
    clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    geminiKey: import.meta.env.VITE_GEMINI_PUBLIC_KEY,
};

export default config;