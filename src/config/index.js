const config = {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};

export default config;