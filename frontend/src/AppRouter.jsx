// This file sets up React Router for navigation between pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignupLogin from './pages/SignupLogin';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';

const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home testUser="Rahul" />} />
        <Route path="/login" element={<SignupLogin />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home testUser="Rahul" />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;
