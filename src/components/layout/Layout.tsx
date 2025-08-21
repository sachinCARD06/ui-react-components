import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <div
        className="pt-16 transition-all duration-300"
        style={{ paddingLeft: "64px" }}
      >
        <main className="min-h-[calc(100vh-4rem)] bg-white main-content">
          <div className="p-4 duration-500 lg:p-6 animate-in slide-in-from-bottom-2">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
