import React, { useState } from "react";
import * as tmImage from "@teachablemachine/image";

const ImageUpload = ({ setPredictions, setIsLoading }) => {
    const [model, setModel] = useState(null);
    const modelURL = "https://teachablemachine.withgoogle.com/models/7AFcHGH3O/";

    // Load the model
    const loadModel = async () => {
        const loadedModel = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
        setModel(loadedModel);
    };

    // Handle image upload
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file && model) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                setIsLoading(true);  // Start loading
                const predictions = await model.predict(img);
                setPredictions(predictions);  // Set predictions
            };
        }
    };

    return (
        <div>
            <h3>Image Upload</h3>
            <button onClick={loadModel}>Load Model</button>
            <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
    );
};

export default ImageUpload;
