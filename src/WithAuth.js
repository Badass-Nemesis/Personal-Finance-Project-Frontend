import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from './Auth';

const withAuth = (Component) => {
    return class extends React.Component {
        render() {
            const isLoggedIn = auth.getToken();
            if (isLoggedIn) {
                return <Component {...this.props} />;
            } else {
                return <Navigate to='/Personal-Finance-Project-Frontend/Login' />;
            }
        }
    };
};

export default withAuth;