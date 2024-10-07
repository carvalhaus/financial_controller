"use client";

import { useRouter } from "next/navigation";
import react from "react";

const ContextApi = react.createContext();

export const useApi = () => react.useContext(ContextApi);

function ContextApiProvider({ children }) {
  const [userData, setUserData] = react.useState(null);

  const router = useRouter();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  react.useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/protected`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          router.push("/login");
        }

        if (response.ok) {
          const userResponse = await fetch(
            `${BASE_URL}/api/users/${data.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const userData = await userResponse.json();

          if (userResponse.ok) {
            setUserData(userData.userData);
          } else {
            console.error(userData.message);
            router.push("/login");
          }
        }
      } catch (err) {
        console.error("An error occurred:", err);
        router.push("/login");
      }
    };

    fetchProtectedData();
  }, [userData]);

  return (
    <ContextApi.Provider value={{ userData, setUserData }}>
      {children}
    </ContextApi.Provider>
  );
}

export default ContextApiProvider;
