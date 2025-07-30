import imgAuthenticator from "../config/imgAuthenticator";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import config from "../config";


const ImgUploader = ({ setImg }) => {

    const ikUploadRef = useRef(null);

    const onError = (err) => console.log("🟥 Error:- ", err);

    const onUploadProgress = (progress) => console.log("Progress", progress);

    const onSuccess = (res) => {
        // console.log("🟩 Success:- ", res);

        setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));

        // Reset the input to allow re-uploading the same file
        if (ikUploadRef.current) {
            ikUploadRef.current.value = "";
        }
    };

    const onUploadStart = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            setImg((prev) => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        data: reader.result.split(",")[1],
                        mimeType: file.type,
                    },
                },
            }));
        };

        reader.readAsDataURL(file);
    };

    return (
        <IKContext
            authenticator={imgAuthenticator}
            urlEndpoint={config.urlEndpoint}
            publicKey={config.publicKey}
        >
            <IKUpload
                // id="image-upload-input"
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                useUniqueFileName={true}
                onSuccess={onSuccess}
                onError={onError}
                style={{ display: "none" }}
                ref={ikUploadRef}
            />
            {
                <label
                    // htmlFor="image-upload-input"
                    className="submit-btn"
                    onClick={() => ikUploadRef.current.click()}
                >
                    <img
                        alt="Upload Image"
                        src="/img/attachment.png"
                        className="submit-btn-icon"
                    />
                </label>
            }
        </IKContext>
    );
}

export default ImgUploader