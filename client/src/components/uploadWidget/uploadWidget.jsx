import { createContext, useState, useEffect } from "react";

const CloudinaryContext = createContext();

function UploadWidget({ uwConfig, setState }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => {
                    setLoaded(true);
                });
                document.body.appendChild(script); // you were also missing this
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            var myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! here is the image info: ", result.info);
                        setState(prev => [...prev, result.info.secure_url])
                    }
                }
            );

            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="cloudinary-button"
                onClick={initializeCloudinaryWidget}
            >
                Upload
            </button>
        </CloudinaryContext.Provider>
    );
}

export default UploadWidget;
export { CloudinaryContext };