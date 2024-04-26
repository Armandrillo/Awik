import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./authentication/login";
import SignUpPage from "./authentication/signup";
import ForgotPasswordPage from "./authentication/forgotpassword";
import AdminPage from "./admin/page/admin-home";
import ProtectedRoute from "./routing/protectedroute";
import PublicRoute from "./routing/publicroute";
import "./App.css";
import PasswordChange from "./authentication/passwordchange";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/password-change"
          element={
            <PublicRoute>
              <PasswordChange />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
