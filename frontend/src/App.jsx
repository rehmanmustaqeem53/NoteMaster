
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AllNotes from "./pages/AllNotes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetails from "./pages/NoteDetails";
import ImportantNotes from "./pages/ImportantNotes";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">
        Loading NoteMaster...
      </div>
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to={user ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="notes" element={<AllNotes />} />

          <Route path="important" element={<ImportantNotes />} />

          <Route path="create" element={<CreateNote />} />

          <Route path="edit/:id" element={<EditNote />} />

          <Route path="notes/:id" element={<NoteDetails />} />

        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
