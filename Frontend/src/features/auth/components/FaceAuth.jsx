// src/features/auth/components/FaceAuth.jsx (Updated Snippet)
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Camera, AlertCircle, User, ChevronRight } from "lucide-react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

export default function FaceAuth({ onFailure, onSwitchToManual }) {
  const webcamRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(true);
  const [possibleMatches, setPossibleMatches] = useState([]); // NEW STATE

  const handleProfileSelect = (profile) => {
    login(profile);
    navigate("/dashboard");
  };

  const captureAndAuthenticate = useCallback(() => {
    if (!webcamRef.current) return;
    setIsProcessing(true);
    setError(null);
    
    const imageSrc = webcamRef.current.getScreenshot();
    
    // MOCK API CALL
    setTimeout(() => {
      setIsProcessing(false);
      const rand = Math.random();
      
      if (rand > 0.6) {
        // High Confidence -> Direct Login
        handleProfileSelect({ id: "P-1023", name: "Yahiya Muhammed", reg: "SSF00125", district: "Nadapuram" });
      } else if (rand > 0.3) {
        // Low Confidence -> Show Multiple Matches
        setPossibleMatches([
          { id: "P-1023", name: "Yahiya Muhammed", reg: "SSF00125", district: "Nadapuram" },
          { id: "P-1088", name: "Yahya Ali", reg: "SSF00921", district: "Kozhikode" },
          { id: "P-2011", name: "Mohammed Yahiya", reg: "SSF00444", district: "Kannur" }
        ]);
      } else {
        // No Face Found
        setError("We couldn't detect your face clearly. Please try again in better lighting.");
        onFailure();
      }
    }, 1500);
  }, [webcamRef, login, navigate, onFailure]);

  // --- NEW UI: MATCH SELECTION SCREEN ---
  if (possibleMatches.length > 0) {
    return (
      <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-bold mb-2">Is this you?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          We found multiple partial matches. Please select your profile.
        </p>
        <div className="space-y-3">
          {possibleMatches.map((profile) => (
            <Card 
              key={profile.id} 
              onClick={() => handleProfileSelect(profile)}
              padding="p-4"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                  <p className="text-xs text-gray-500">{profile.reg} • {profile.district}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </Card>
          ))}
        </div>
        <Button variant="secondary" onClick={() => setPossibleMatches([])} className="mt-6">
          Scan Again
        </Button>
      </div>
    );
  }
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