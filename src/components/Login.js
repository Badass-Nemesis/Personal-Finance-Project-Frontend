import React, { useState } from 'react';
import axios from 'axios';
import auth from '../Auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}api/auth`, { email: email, password: password })
            .then((response) => {
                auth.setToken(response.data);
                window.location = '/Personal-Finance-Project-Frontend/';
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                {errorMessage && <div>{errorMessage}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
