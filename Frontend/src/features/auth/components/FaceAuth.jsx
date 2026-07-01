// src/features/auth/components/FaceAuth.jsx
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ScanFace,
  AlertCircle,
  ArrowRight,
  X,
  CameraOff,
  RefreshCcw
} from "lucide-react";
import Button from "@/components/common/Button";

export default function FaceAuth() {
  const webcamRef = useRef(null);
  const inputRef = useRef(null); // NEW: Ref for the text input
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(true);
  const [possibleMatches, setPossibleMatches] = useState([]);

  const [regNumber, setRegNumber] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0); // NEW: Track failed scans

  const handleProfileSelect = (profile) => {
    login(profile);
    navigate("/dashboard");
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regNumber.trim()) return;
    login({
      id: "P-1023",
      name: "Yahiya Muhammed",
      reg: regNumber.toUpperCase(),
      district: "Nadapuram",
    });
    navigate("/dashboard");
  };

  const captureAndAuthenticate = useCallback(() => {
    if (!webcamRef.current) return;
    setIsProcessing(true);
    setError(null);

    setTimeout(() => {
      setIsProcessing(false);
      const rand = Math.random();

      if (rand > 0.6) {
        handleProfileSelect({
          id: "P-1023",
          name: "Yahiya Muhammed",
          reg: "SSF00125",
          district: "Nadapuram",
        });
      } else if (rand > 0.3) {
        setPossibleMatches([
          {
            id: "P-1023",
            name: "Yahiya Muhammed",
            reg: "SSF00125",
            district: "Nadapuram",
          },
          {
            id: "P-1088",
            name: "Yahya Ali",
            reg: "SSF00921",
            district: "Kozhikode",
          },
        ]);
      } else {
        setError("Face not clearly detected. Please try again in better lighting.");
        
        // NEW: 2-Strike Auto-Focus Logic
        setFailedAttempts((prev) => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            // Delay slightly to ensure UI updates before focusing
            setTimeout(() => {
              inputRef.current?.focus();
            }, 150);
          }
          return newCount;
        });
      }
    }, 1500);
  }, [webcamRef, login, navigate]);

  // If we have multiple matches, we can still render an overlay or swap views.
  // Assuming that logic remains in your app.

  return (
    <div className="w-full flex flex-col items-center pb-8">
      <h2 className="text-[2.5rem] leading-tight font-semibold text-brand-textDark tracking-tight text-center">
        Face <span className="text-brand-accent">Login</span>
      </h2>
      <div className="h-4 w-full shrink-0"></div>
      <p className="text-brand-textMuted text-[15.5px] text-center px-6 leading-relaxed max-w-[300px]">
        Position your face inside the frame to instantly access your portal.
      </p>

      <div className="h-8 w-full shrink-0"></div>

      {/* CAMERA FRAME */}
      <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-brand-dark shadow-[0_20px_40px_rgba(15,61,48,0.15)] ring-4 ring-brand-accent/30 border-8 border-brand-cream transition-all duration-300">
        
        {!cameraPermission ? (
          // STATE 1: CAMERA DENIED
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark px-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mb-4 opacity-80" />
            <span className="text-brand-cream font-bold tracking-[0.15em] uppercase text-[12px] mb-2">
              Camera Blocked
            </span>
            <p className="text-brand-light/70 font-medium text-[11px] leading-relaxed mb-5">
              Please allow camera access in your browser settings to use face scan.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-cream/10 rounded-full text-brand-cream text-[10px] font-bold uppercase tracking-wider border border-brand-cream/20 hover:bg-brand-cream/20 active:scale-95 transition-all"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reload Page
            </button>
          </div>

        ) : isInputFocused ? (
          // STATE 2: CAMERA PAUSED (Text input is focused)
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark cursor-pointer hover:bg-brand-dark/90 active:bg-brand-dark/80 transition-colors group"
            onClick={() => document.activeElement?.blur()}
          >
            <CameraOff className="w-8 h-8 text-brand-light mb-4 opacity-60 group-hover:scale-110 transition-transform" />
            <span className="text-brand-light/70 font-bold tracking-[0.2em] uppercase text-[11px] mb-3">
              Camera Paused
            </span>
            
            {/* Themed "Resume" Button */}
            <div className="px-4 py-1.5 bg-brand-accent/15 border border-brand-accent/30 rounded-full text-brand-accent text-[9px] font-bold uppercase tracking-wider group-hover:bg-brand-accent/25 transition-colors">
              Tap to Resume
            </div>
          </div>

        ) : (
          // STATE 3: CAMERA ACTIVE
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            onUserMediaError={() => setCameraPermission(false)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isProcessing ? "opacity-40" : "opacity-100"}`}
          />
        )}

        {/* PROCESSING OVERLAY */}
        {isProcessing && !isInputFocused && cameraPermission && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/60 backdrop-blur-sm z-10">
            <div className="w-12 h-12 border-4 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin mb-4"></div>
            <span className="text-brand-accent font-bold tracking-widest uppercase text-[11px]">
              Analyzing
            </span>
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-[10px] font-medium leading-relaxed text-brand-textMuted/70 px-4 max-w-[280px]">
        Biometric data is processed locally for instant verification and is
        never stored on our servers.
      </p>

      <div className="h-8 w-full shrink-0"></div>

      {error && (
        <div className="mb-6 p-4 bg-red-50/80 border border-red-100 text-red-600 text-[14px] font-medium rounded-2xl text-center w-full max-w-[280px]">
          {error}
        </div>
      )}

      {/* CONTROLS */}
      <div className="w-full max-w-[300px] flex flex-col items-center">
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isProcessing}
            className="h-[56px] px-4 flex items-center justify-center gap-1.5 bg-brand-card border border-black/5 rounded-2xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-brand-textMuted hover:text-red-500 disabled:opacity-50 shrink-0"
          >
            <X className="w-4 h-4" />
            <span className="font-bold text-[13px] uppercase tracking-wide">
              Cancel
            </span>
          </button>

          <Button
            onClick={captureAndAuthenticate}
            disabled={isProcessing || isInputFocused || !cameraPermission}
            variant="dark"
            className="flex-1 py-4 text-[16px] shadow-lg disabled:opacity-50"
          >
            <ScanFace className="w-5 h-5 text-brand-accentLight" />
            {isProcessing ? "Scanning..." : "Scan Face"}
          </Button>
        </div>

        <div className="h-5 w-full shrink-0"></div>

        <div className="flex items-center gap-3 w-full">
          <div className="h-px bg-black/10 flex-1"></div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-textMuted">
            Or
          </span>
          <div className="h-px bg-black/10 flex-1"></div>
        </div>

        <div className="h-5 w-full shrink-0"></div>

        <form onSubmit={handleRegSubmit} className="w-full">
          <div className="relative">
            <input
              ref={inputRef} /* NEW: Attached the ref here */
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="ENTER REG NO."
              className="w-full bg-brand-card border border-black/5 rounded-2xl pl-5 pr-14 py-4 font-bold text-brand-textDark placeholder:font-medium placeholder-brand-textMuted/60 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all uppercase text-[14.5px] shadow-sm"
            />
            <button
              type="submit"
              disabled={regNumber.length < 4 || isProcessing}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-dark text-brand-accent rounded-xl disabled:opacity-40 hover:bg-brand-mid transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}