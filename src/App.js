import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './components/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
    const Auth = useAuth();
    return Auth.user ? children : <Navigate to="/login" />;
};

function App() {
  return (
          <AuthProvider>
              <Router>
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      //<Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />q
                  </Routes>
              </Router>
          </AuthProvider>
      );
}

export default App;
