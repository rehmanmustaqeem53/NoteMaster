
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">

      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 p-5 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
