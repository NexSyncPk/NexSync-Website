// src/layouts/AdminLayout.tsx
import { use, type ReactNode } from "react";
import { Sidebar } from "../ui/sidebar";
import { Navigation } from "../Navigation";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { useLocation } from "react-router-dom";
// import { Footer } from "../Footer";

type Props = {
  children: ReactNode;
};

function formatPath(path: string) {
  return path
    .replace(/^\/+/, "") // Remove leading slash(es)
    .split("/") // Split by path
    .map(
      (path) => path.split(/(?=[A-Z])/).join(" ") // Split by capital letters
    )
    .join(" > ");
}

const AdminLayout = ({ children }: Props) => {
  const location = useLocation();
  // Format the current path for display
  const formattedPath = formatPath(location.pathname);

  return (
    <>
      <SidebarProvider>
        <div className="relative  w-full min-h-screen mb-2 flex">
          <AppSidebar className="absolute" />
          <main className="">
            <div className="relative w-screen h-12 border-b-2 flex">
              <div className="w-14 h-full flex items-center justify-between border-r-2 border-slate-300">
                <SidebarTrigger className="absolute z-10 bg-transparent top-3 px-7 " />
              </div>
              <div className="flex items-center h-full w-[96%] px-8">
                <h1>
                  {formattedPath == "admin > dashboard" ? " " : formattedPath}
                </h1>
              </div>
            </div>
            {children}
          </main>
        </div>
        {/* <Footer /> */}
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
