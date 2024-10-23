"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

  const login = async (credentials) => {
    const endpoint = `${BASE_URL}/api/sessions/login`;

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

      sessionStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const register = async (values) => {
    const endpoint = `${BASE_URL}/api/sessions/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
