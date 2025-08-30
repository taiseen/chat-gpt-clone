import { SignIn } from "@clerk/clerk-react";
import links from "../../routes/links";

const SignInPage = () => {

    return (
        <div className="h-full flex items-center justify-center">
            <SignIn
                path={links.signIn}
                signUpUrl={links.sighUp}
                forceRedirectUrl={links.dashboard}
            />
        </div>
    );
}

export default SignInPage