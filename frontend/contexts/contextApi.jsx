"use client";

import react from "react";

const ContextApi = react.createContext();

export const useApi = () => react.useContext(ContextApi);

function ContextApiProvider({ children }) {
  const [userData, setUserData] = react.useState(null);

  return (
    <ContextApi.Provider value={{ userData, setUserData }}>
      {children}
    </ContextApi.Provider>
  );
}

export default ContextApiProvider;
