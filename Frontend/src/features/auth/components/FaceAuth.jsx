// src/features/auth/components/FaceAuth.jsx
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { Camera, AlertCircle } from "lucide-react";

export default function FaceAuth({ onFailure, onSwitchToManual }) {
  const webcamRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(true);

  const captureAndAuthenticate = useCallback(() => {
    if (!webcamRef.current) return;
    
    setIsProcessing(true);
    setError(null);
    
    const imageSrc = webcamRef.current.getScreenshot();
    
    // MOCK API CALL
    setTimeout(() => {
      // Simulate an 80% chance of success for testing
      if (Math.random() > 0.2) {
        login({ id: "P-1023", name: "Yahiya Muhammed", reg: "SSF00125" });
        navigate("/dashboard");
      } else {
        setIsProcessing(false);
        setError("We couldn't detect your face clearly. Please try again in better lighting.");
        onFailure();
      }
    }, 1500);
  }, [webcamRef, login, navigate, onFailure]);

  if (!cameraPermission) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center mt-10">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="font-semibold text-lg">Camera Access Denied</h3>
        <p className="text-gray-500 mt-2 mb-6 text-sm">
          We need camera access to verify your identity. You can enable it in your browser settings, or continue with your registration number.
        </p>
        <Button onClick={onSwitchToManual} fullWidth>
          Use Registration Number
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Face Login</h2>
      <p className="text-gray-500 mb-8 text-center text-sm px-4">
        Position your face in the frame to access your dashboard.
      </p>

      <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-3xl overflow-hidden bg-gray-900 shadow-xl ring-4 ring-gray-100">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          onUserMediaError={() => setCameraPermission(false)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}
        />
        
        {/* Scanning Overlay Animation */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="mt-10 w-full space-y-3">
        <Button 
          onClick={captureAndAuthenticate} 
          disabled={isProcessing}
          fullWidth
          className="bg-gray-900 text-white"
        >
          <Camera className="w-5 h-5 mr-2" />
          {isProcessing ? "Scanning..." : "Scan Face"}
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={onSwitchToManual}
          disabled={isProcessing}
          fullWidth
        >
          Use Registration Number
        </Button>
      </div>
      
      <p className="mt-6 text-xs text-gray-400 text-center max-w-xs">
        Your selfie is used only to verify your identity during login and is not stored after authentication.
      </p>
    </div>
  );
}