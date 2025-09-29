import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DesignServices from "./pages/DesignServices";
import Documents from "./pages/Documents";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./routes/RequireAuth";

function App() {
  const location = useLocation();
  const hideChrome = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && (
        // Single Header
        <Header />
      )}

      {/* Main content */}
      <div className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/services"
            element={
              <RequireAuth>
                <DesignServices />
              </RequireAuth>
            }
          />
          <Route
            path="/documents"
            element={
              <RequireAuth>
                <Documents />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {!hideChrome && (
        // Single Footer
        <Footer />
      )}
    </div>
  );
}

export default App;
