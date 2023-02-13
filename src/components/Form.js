
import TextField from '@mui/material/TextField';

import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [inputValue5, setInputValue5] = useState('');
    const [inputValue6, setInputValue6] = useState('');
    const [inputValue7, setInputValue7] = useState('');
    const [inputValue8, setInputValue8] = useState('');
    const [inputValue9, setInputValue9] = useState('');
    const [inputValue10, setInputValue10] = useState('');

    const handleChange1 = (e) => {
        setInputValue1(e.target.value);
    };

    const handleChange2 = (e) => {
        setInputValue2(e.target.value);
    };

    const handleChange3 = (e) => {
        setInputValue3(e.target.value);
    };

    const handleChange4 = (e) => {
        setInputValue4(e.target.value);
    };

    const handleChange5 = (e) => {
        setInputValue5(e.target.value);
    };

    const handleChange6 = (e) => {
        setInputValue6(e.target.value);
    };

    const handleChange7 = (e) => {
        setInputValue7(e.target.value);
    };

    const handleChange8 = (e) => {
        setInputValue8(e.target.value);
    };

    const handleChange9 = (e) => {
        setInputValue9(e.target.value);
    };

    const handleChange10 = (e) => {
        setInputValue10(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/transactions/add/manual', {
                dateAndTime: inputValue1,
                narration: inputValue2,
                amount: inputValue3,
                transactionType: inputValue4,
                referenceNumber: inputValue5,
                availableBalance: inputValue6,
                beneficiaryAccountNumber: inputValue7,
                beneficiaryName: inputValue8,
                remitterAccountNumber: inputValue9,
                remitterName: inputValue10
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date And Time :
                <TextField
                    type='datetime-local'
                    // label="Date and Time"
                    name="dateAndTime"
                    value={inputValue1}
                    onChange={handleChange1}
                />
            </label>
            <hr />
            <label>
                Narration :
                <TextField
                    type="text"
                    label="Narration"
                    name="narration"
                    value={inputValue2}
                    onChange={handleChange2}
                />
            </label>
            <hr />
            <label>
                Amount :
                <TextField
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={inputValue3}
                    onChange={handleChange3}
                />
            </label>
            <hr />
            <label>
                Transaction Type :
                <TextField
                    id="outlined-helperText"
                    label="Transaction Type"
                    defaultValue="Credit"
                    helperText="select from Credit / Debit"
                    value={inputValue4}
                    onChange={handleChange4}
                />
            </label>
            <hr />
            <label>
                Reference Number :
                <TextField
                    id="outlined-number"
                    label="Reference Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={inputValue5}
                    onChange={handleChange5}
                />
            </label>
            <hr />
            <label>
                Available Balance :
                <TextField
                    id="outlined-number"
                    label="Available Balance"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={inputValue6}
                    onChange={handleChange6}
                />
            </label>
            <hr />
            <label>
                Beneficiary Account Number :
                <TextField
                    id="outlined-number"
                    label="Beneficiary Account Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={inputValue7}
                    onChange={handleChange7}
                />
            </label>
            <hr />
            <label>
                Beneficiary Name :
                <TextField
                    type="text"
                    label="Beneficiary Name"
                    name="Beneficiary Name"
                    value={inputValue8}
                    onChange={handleChange8}
                />
            </label>
            <hr />
            <label>
                Remitter Account Number
                <TextField
                    id="outlined-number"
                    label="Remitter Account Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={inputValue9}
                    onChange={handleChange9}
                />
            </label>
            <hr />
            <label>
                Remitter Name :
                <TextField
                    type="text"
                    name="Remitter Name"
                    value={inputValue10}
                    onChange={handleChange10}
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