import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { useState } from "react";

const Homepage = () => {
    const [typingStatus, setTypingStatus] = useState("human1");

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-24 h-full relative">
            {/* Orbital background image */}
            <img
                src="/img/orbital.png"
                alt="Decorative background"
                className="absolute bottom-0 left-0 opacity-5 -z-10 orbital"
            />

            {/* Left section */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 lg:gap-6 text-center max-w-2xl">
                <h1 className="text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                    AI Chat
                </h1>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
                    Supercharge your creativity and productivity with AI
                </h2>

                <h3 className="font-normal text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-full lg:max-w-[70%]">
                    AI Chat is your intelligent assistant that helps with content creation,
                    coding, research, and more. Powered by advanced machine learning,
                    it understands context and delivers human-like responses to boost
                    your productivity.
                </h3>

                <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl text-sm md:text-base mt-4 hover:bg-white hover:text-blue-500 transition-colors duration-300 border-2 border-transparent hover:border-blue-500"
                >
                    Get Started - It's Free
                </Link>
            </div>

            {/* Right section */}
            <div className="flex-1 flex items-center justify-center h-full">
                <div className="relative w-full aspect-square max-w-md bg-indigo-950 rounded-3xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0 overflow-hidden rounded-3xl w-full h-full">
                        <div className="w-full h-full bg-[url('/img/bg.png')] opacity-20 bg-cover bg-animate" />
                    </div>

                    <img
                        src="/img/bot.png"
                        alt="AI Assistant Illustration"
                        className="w-full h-full object-contain p-8 bot-animate"
                    />

                    <div className="absolute bottom-0 right-0 flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
                        <img
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                            src={
                                typingStatus === "human1"
                                    ? "/img/human1.png"
                                    : typingStatus === "human2"
                                        ? "/img/human2.png"
                                        : "/img/bot.png"
                            }
                        />

                        <TypeAnimation
                            sequence={[
                                "Human: How can I improve my React code?",
                                2000,
                                () => setTypingStatus("bot"),
                                "Bot: Here are 3 suggestions: 1) Use React.memo, 2) Implement code splitting, 3) Optimize state management",
                                2000,
                                () => setTypingStatus("human2"),
                                "Human2: Can you write a poem about AI?",
                                2000,
                                () => setTypingStatus("bot"),
                                "Bot: Circuits hum, data streams flow,\nAI's mind begins to grow.\nLearning fast from all it's shown,\nNow it writes this poem alone.",
                                2000,
                                () => setTypingStatus("human1"),
                            ]}
                            cursor={true}
                            wrapper="span"
                            repeat={Infinity}
                            omitDeletionAnimation={true}
                            className="text-xs sm:text-sm text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Terms section */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                <img src="/img/logo.png" alt="AI Logo" className="w-4 h-4" />

                <div className="flex gap-3 text-gray-500 text-xs">
                    <Link to="/terms" className="hover:text-blue-500">Terms of Service</Link>
                    <span>|</span>
                    <Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;