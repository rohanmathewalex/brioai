// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Add routes for other pages such as signup/login here */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
