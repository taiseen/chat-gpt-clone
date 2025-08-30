import imgAuthenticator from "../api/imgAuthenticator";
import config from "../config";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";


const ImgUploader = ({ setImg }) => {

    const ikUploadRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const onError = (err) => {
        console.log("🟥 Error:- ", err);
        setIsUploading(false);
        setUploadProgress(0);
        setImg((prev) => ({ ...prev, isLoading: false, error: "Upload failed" }));
    };

    const onUploadProgress = (progress) => {
        const percentComplete = Math.round((progress.loaded / progress.total) * 100);
        setUploadProgress(percentComplete);
    };

    const onSuccess = (res) => {

        // Reset progress after a short delay
        setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0)
        }, 4000);

        setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));

        // Reset the input to allow re-uploading the same file
        if (ikUploadRef.current) {
            ikUploadRef.current.value = "";
        }
    };

    const onUploadStart = (e) => {
        const file = e.target.files[0];
        setIsUploading(true);
        setUploadProgress(0);

        const reader = new FileReader();

        reader.onloadend = () => {
            // Extract just the base64 data without the data URL prefix
            const base64Data = reader.result.split(",")[1];

            setImg((prev) => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        data: base64Data,
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
            urlEndpoint={config.imgUrlEndpoint}
            publicKey={config.publicKey}
        >
            <div className="flex items-center">
                <IKUpload
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    useUniqueFileName={true}
                    onSuccess={onSuccess}
                    onError={onError}
                    style={{ display: "none" }}
                    ref={ikUploadRef}
                />

                <label onClick={() => ikUploadRef.current.click()}>
                    <img
                        alt="Upload Image"
                        className="w-7 h-7 cursor-pointer"
                        src="/img/attachment.png"
                    />
                </label>

                {isUploading && (
                    <div className="absolute -top-4 left-0 w-full h-2 rounded-2xl flex items-center justify-between gap-2">
                        {/* Progress bar with percentage */}
                        <div className="w-[92%] h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-700 transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>

                        {/* Percentage text */}
                        <span className="text-xs font-medium text-orange-400 pb-0.5 min-w-[30px]">
                            {uploadProgress}%
                        </span>
                    </div>
                )}
            </div>
        </IKContext>
    );
}

export default ImgUploader