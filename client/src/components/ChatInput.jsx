import ImgUploader from "./ImgUploader";

const ChatInput = ({ onSubmit, setImg }) => {

    return (
        <div className="form-wrapper mx-auto">

            <form onSubmit={onSubmit} className="form relative">

                <input
                    type="text"
                    name="text"
                    className="input-field"
                    placeholder="Ask me anything..."
                />

                <div className="flex gap-2">
                    <ImgUploader setImg={setImg} />

                    <button className="submit-btn">
                        <img
                            className="submit-btn-icon"
                            src="/img/arrow.png"
                            alt="submit"
                        />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatInput