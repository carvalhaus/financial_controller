"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      sessionStorage.setItem("token", token);

      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [router]);

  return <div>Autenticando...</div>;
};

export default OAuthCallback;
