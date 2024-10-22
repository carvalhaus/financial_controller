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
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const fetchWithCredentials = async (url) => {
    const token = getCookie("token");

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
    try {
      const protectedData = await fetchWithCredentials(
        `${BASE_URL}/api/protected`
      );

      const userDataResponse = await fetchWithCredentials(
        `${BASE_URL}/api/users/${protectedData.userId}`
      );

      setUserData(userDataResponse.userData);
    } catch (err) {
      console.error("Erro inesperado:", err);
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
