import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import * as tmImage from "@teachablemachine/image";

const CameraCapture = ({ setPredictions, setIsLoading }) => {
    const webcamRef = useRef(null);
    const [model, setModel] = useState(null);
    const modelURL = "https://teachablemachine.withgoogle.com/models/7AFcHGH3O/";

    // Load the model
    const loadModel = async () => {
        const loadedModel = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
        setModel(loadedModel);
    };

    // Capture the image and predict
    const captureAndPredict = async () => {
        if (webcamRef.current && model) {
            const imageSrc = webcamRef.current.getScreenshot();
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                setIsLoading(true);  // Start loading
                const predictions = await model.predict(img);
                setPredictions(predictions);  // Set predictions
            };
        }
    };

    return (
        <div>
            <h3>Camera Capture</h3>
            <button onClick={loadModel}>Load Model</button>
            <div className="webcam-container">
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={300} />
            </div>
            <button onClick={captureAndPredict}>Capture & Predict</button>
        </div>
    );
};

export default CameraCapture;
