import { SignUp } from "@clerk/clerk-react";
import links from "../../routes/links";

const SignUpPage = () => {

    return (
        <div className="h-full flex items-center justify-center">
            <SignUp path={links.sighUp} signInUrl={links.signIn} />
        </div>
    );
}

export default SignUpPage
