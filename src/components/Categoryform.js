import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';
import auth from '../Auth';
import withAuth from '../WithAuth';

function MyForm() {
    const [inputValue1, setInputValue1] = useState('');

    const handleChange1 = (e) => {
        setInputValue1(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}api/category/newCategory`, {
            name: inputValue1
        }, { headers: { "x-auth-token": auth.getToken() } })
            .then(() => { window.location.reload(); })
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name :
                <TextField
                    type='text'
                    // label="Date and Time"
                    name="Name"
                    value={inputValue1}
                    onChange={handleChange1}
                />
            </label>
            <hr />
            <button type="submit">Submit</button>
        </form>
    );
}

export default withAuth(MyForm);