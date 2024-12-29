import React, { useState } from "react";
import CameraCapture from "./components/CameraCapture";
import ImageUpload from "./components/ImageUpload";
import LabelDisplay from "./components/LabelDisplay";  // Import LabelDisplay
import "./App.css";

function App() {
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // Loading state

    // Log predictions to confirm they are being set
    console.log(predictions);

    // Handle the loading state while waiting for predictions
    const handlePredictions = (newPredictions) => {
        setIsLoading(false);  // Stop loading when predictions are done
        setPredictions(newPredictions);
    };

    return (
        <div className="App">
            <h1>Teachable Machine Image Model</h1>
            <p>Select an option to analyze an image:</p>

            {/* Camera Capture */}
            <CameraCapture setPredictions={handlePredictions} setIsLoading={setIsLoading} />
            
            {/* Image Upload */}
            <ImageUpload setPredictions={handlePredictions} setIsLoading={setIsLoading} />
            
            {/* Display Loader or Predictions */}
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <LabelDisplay predictions={predictions} />
            )}
        </div>
    );
}

export default App;
