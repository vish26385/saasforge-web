"use client";

import { createContext, useEffect, useState } from "react";
import { authStorage } from "@/lib/auth/authStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isReady: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = authStorage.getAccessToken();
    setIsAuthenticated(!!token);
    setIsReady(true);
  }, []);

  const logout = () => {
    authStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, logout }}>
      {children}
    </AuthContext.Provider>
  );
}