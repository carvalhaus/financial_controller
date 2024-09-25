import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./_components/sidebar";
import SidebarMobile from "./_components/sidebarMobile";

function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex w-svw h-svh">
        <Sidebar />

        <div className="flex-1">
          <>
            <SidebarMobile />
            {children}
          </>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default DashboardLayout;
