import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./_components/sidebar";
import SidebarMobile from "./_components/sidebarMobile";

function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-svw h-svh">
        <Sidebar />

        <div className="flex-1">{children}</div>
        <Toaster />
      </div>
    </>
  );
}

export default DashboardLayout;
