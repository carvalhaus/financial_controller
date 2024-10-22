"use client";

import { useRouter } from "next/navigation";
import react from "react";

const ContextApi = react.createContext();

export const useApi = () => react.useContext(ContextApi);

function ContextApiProvider({ children }) {
  const [userData, setUserData] = react.useState(null);

  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const fetchWithCredentials = async (url) => {
    const token = getCookie("token");

    if (!token) {
      console.log("Token not found, retrying...");
      return null;
    }

    console.log("Token being sent in header:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar os dados do endereço: ${url}`);
    }

    return response.json();
  };

  const fetchProtectedData = async () => {
    let tokenAvailable = false;
    let attempts = 0;

    while (!tokenAvailable && attempts < 5) {
      const protectedData = await fetchWithCredentials(
        `${BASE_URL}/api/protected`
      );

      if (protectedData) {
        const userDataResponse = await fetchWithCredentials(
          `${BASE_URL}/api/users/${protectedData.userId}`
        );

        if (userDataResponse) {
          setUserData(userDataResponse.userData);
          tokenAvailable = true;
        }
      }

      if (!tokenAvailable) {
        attempts += 1;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      }
    }

    if (!tokenAvailable) {
      console.error("Erro: não foi possível recuperar o token.");
      router.push("/login");
    }
  };

  react.useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        userData,
        setUserData,
        fetchWithCredentials,
        fetchProtectedData,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ContextApiProvider;
