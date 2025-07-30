import imgAuthenticator from "../config/imgAuthenticator";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import config from "../config";


const ImgUploader = ({ setImg }) => {
    const ikUploadRef = useRef(null);

    const onError = (err) => console.log("Error", err);

    const onUploadProgress = (progress) => console.log("Progress", progress);

    const onSuccess = (res) => {
        console.log("Success", res);
        setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
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
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                useUniqueFileName={true}
                onSuccess={onSuccess}
                onError={onError}
                style={{ display: "none" }}
                fileName="test-upload.png"
                ref={ikUploadRef}
            />
            {
                <label onClick={() => ikUploadRef.current.click()}>
                    <img src="/attachment.png" alt="" />
                </label>
            }
        </IKContext>
    );
}

export default ImgUploader