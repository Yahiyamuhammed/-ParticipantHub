// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { APP_CONFIG } from "@/config/app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic expiration check
      if (new Date().getTime() < parsed.expiresAt) {
        return parsed.user;
      }
      localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
    }
    return null;
  });

  const login = (userData) => {
    const sessionData = {
      user: userData,
      expiresAt: new Date().getTime() + 1000 * 60 * 60 * 24, // 24 hours
    };
    localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}