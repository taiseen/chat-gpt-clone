import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="flex items-center justify-between pb-2 border-b borderStyle">

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
    )
}

export default Header