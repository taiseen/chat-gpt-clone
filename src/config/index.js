const config = {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    urlEndpoint: import.meta.env.VITE_IMAGE_KIT_ENDPOINT,
    publicKey: import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY,
    clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};

export default config;