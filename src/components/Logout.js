import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../Auth';

function Logout() {
    auth.clearToken();

    // Redirect the user to the login page
    return <Navigate to="/Login" />;
}

export default Logout;
