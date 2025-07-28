import { useChatInput } from "../api/mutation";

const Dashboard = () => {
    const { createChat } = useChatInput();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        createChat.mutate(text);
    };

    return (
        <div className="page-container border-l borderStyle">
            <div className="content-wrapper">
                {/* Logo */}
                <div className="logo-section">
                    <img src="/img/logo.png" alt="logo" className="w-16 h-16" />
                    <h1 className="logo-title">AI Chat</h1>
                </div>

                {/* Options */}
                <div className="options-container">
                    <div className="option-card">
                        <img src="/img/chat.png" alt="chat" className="w-10 h-10 object-cover" />
                        <span>Create a New Chat</span>
                    </div>

                    <div className="option-card">
                        <img src="/img/image.png" alt="image" className="w-10 h-10 object-cover" />
                        <span>Analyze Images</span>
                    </div>

                    <div className="option-card">
                        <img src="/img/code.png" alt="code" className="w-10 h-10 object-cover" />
                        <span>Help me with my Code</span>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Ask me anything..."
                        className="input-field"
                    />

                    <button className="submit-btn">
                        <img src="/img/arrow.png" alt="submit" className="submit-btn-icon" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
