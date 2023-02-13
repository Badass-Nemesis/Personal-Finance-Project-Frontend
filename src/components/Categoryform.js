
import TextField from '@mui/material/TextField';

import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
    const [inputValue1, setInputValue1] = useState('');

    const handleChange1 = (e) => {
        setInputValue1(e.target.value);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/category/newCategory', {
                name:inputValue1
            })
            .then((response) => {
                console.log(response.data);
            });
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

export default MyForm;

// import React from 'react';
// import axios from 'axios';

// export default 