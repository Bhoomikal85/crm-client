import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmailLogin from '../modules/auth/emailLogin';
import Signup from '../modules/auth/signUp';
import ProtectedRoute from './protectedRoute';
import PrivateRoute from './privateRoute';

const IndexRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Signup />} />
                <Route path="/email-login" element={<EmailLogin />} />
                 <Route path="/signup" element={<Signup />} />      
            </Route>

            {/* Private (Logged in only) */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<div>Dashboard</div>} />
            </Route>
        </Routes>
    );
};

export default IndexRoutes;
