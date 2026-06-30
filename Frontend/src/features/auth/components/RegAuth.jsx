// src/features/auth/components/RegAuth.jsx
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

export default function RegAuth({ onSwitchToFace }) {
  const [regNumber, setRegNumber] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regNumber.trim()) return;
    
    // MOCK API CALL
    login({ id: "P-1023", name: "Yahiya Muhammed", reg: regNumber });
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col px-2 pt-4">
      <h2 className="text-2xl font-bold mb-2">Registration Login</h2>
      <p className="text-gray-500 mb-8 text-sm">
        Enter your SSF registration number to continue.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>
          <input
            type="text"
            id="regNumber"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
            placeholder="e.g. SSF-8921"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all uppercase"
            autoFocus
          />
        </div>

        <div className="space-y-3 mt-4">
          <Button type="submit" fullWidth disabled={regNumber.length < 4}>
            Login to Dashboard
          </Button>
          
          <Button type="button" variant="secondary" onClick={onSwitchToFace} fullWidth>
            Try Face Scan Again
          </Button>
        </div>
      </form>
    </div>
  );
}