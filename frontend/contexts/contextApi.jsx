"use client";

import { useRouter } from "next/navigation";
import react from "react";

const ContextApi = react.createContext();

export const useApi = () => react.useContext(ContextApi);

function ContextApiProvider({ children }) {
  const [userData, setUserData] = react.useState(null);

  const router = useRouter();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  };

  const fetchWithCredentials = async (url) => {
    const token = getCookie("token");

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar os dados do endereço: ${url}`);
    }

    return response.json();
  };

  const fetchProtectedData = async () => {
    try {
      const protectedData = await fetchWithCredentials(
        `https://financial-controller-xck7.onrender.com/api/protected`
      );

      const userDataResponse = await fetchWithCredentials(
        `https://financial-controller-xck7.onrender.com/api/users/${protectedData.userId}`
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
