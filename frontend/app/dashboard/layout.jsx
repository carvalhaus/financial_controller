"use client";

import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./_components/sidebar";
import ContextApiProvider from "@/contexts/contextApi";

function DashboardLayout({ children }) {
  return (
    <ContextApiProvider>
      <div className="flex flex-col md:flex-row w-svw h-svh">
        <Sidebar />

        <div className="flex-1">{children}</div>
        <Toaster />
      </div>
    </ContextApiProvider>
  );
}

export default DashboardLayout;
