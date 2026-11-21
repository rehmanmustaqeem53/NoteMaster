
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-gray-950">

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-5 md:p-8">
          <Outlet />
        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}
