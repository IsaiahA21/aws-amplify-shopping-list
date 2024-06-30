import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        console.log("ProtectedRoute: isAuthenticated: " + isAuthenticated)
        // Redirect to the login page if not authenticated
        return <Navigate to="/Login" replace />;
    }
    console.log("ProtectedRoute: isAuthenticated: " + isAuthenticated)

    return children;
};

export default ProtectedRoute;
