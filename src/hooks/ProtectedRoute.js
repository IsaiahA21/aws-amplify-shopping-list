import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component is used to protect routes that require authentication
//If isAuthenticated is false, redirects the user to the /Login page.

//If isAuthenticated is true, it returns the children components, which are the protected component(Account page) that should only be accessible to authenticated users.
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
