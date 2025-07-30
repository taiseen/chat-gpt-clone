import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import config from "../config";

const queryClient = new QueryClient();

if (!config.clerkKey) {
    throw new Error("Missing Publishable Key");
}

const RootLayout = () => {

    return (
        <ClerkProvider publishableKey={config.clerkKey} afterSignOutUrl="/">
            <QueryClientProvider client={queryClient}>
                <div className="p-4 px-6 h-screen flex flex-col">

                    <header className="flex items-center justify-between">

                        <Link to="/" className="flex items-center font-bold gap-2">
                            <img src="/img/logo.png" alt="logo" className="w-8 h-8" />
                            <span>AI Chat</span>
                        </Link>

                        <div className="user">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>

                    </header>

                    <main className="flex-1 overflow-hidden">
                        {/* renders nested children */}
                        <Outlet />
                    </main>
                </div>
            </QueryClientProvider>
        </ClerkProvider>
    )
}

export default RootLayout
