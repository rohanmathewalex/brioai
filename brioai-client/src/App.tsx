import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
