import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/authContext";
import CareerPage from "./pages/CareerPage";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PageLayout>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/career"
            element={
              <ProtectedRoute>
                <CareerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user_profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          </Routes>
        </PageLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
