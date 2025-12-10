import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactsDashboard from './components/contacts/contactsDashboard';
import Login from './components/auth/login';
import ProtectedRoute from './components/protectedRoute';

 

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={
          <ProtectedRoute>
            <ContactsDashboard />
            </ProtectedRoute>
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
