import { ClerkProvider } from "@clerk/clerk-react";
import config from "../config";

const ClerkAuthProvider = ({ children }) => {

    return (
        <ClerkProvider
            publishableKey={config.clerkKey}
            afterSignOutUrl="/"
        >
            {children}
        </ClerkProvider>
    )
}

export default ClerkAuthProvider