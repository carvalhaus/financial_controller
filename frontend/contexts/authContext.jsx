"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const login = async (credentials) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Falha ao fazer login");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
