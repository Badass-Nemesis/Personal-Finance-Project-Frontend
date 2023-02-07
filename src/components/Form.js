import React, { useState } from "react";
import TextField from '@mui/material/TextField';

const Form = () => {

    const [formData, setFormData] = useState({ 
        value1: 'name',
        value2: 'dateAndTime',
        value3: 'narration',
        value4: 'amount',
        value5: 'transactionType',
        value6: 'referenceNumber',
        value7: 'availableBalance',
        value8: 'beneficiaryAccountNumber'
    });

    const handleChangeTransaction = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // const handleChangeTransactionDate = (event) => {
    //     seetFormData({ ...})
    // }

    const handleSubmitTransaction = (event) => {
        event.preventDefault();

        // send the form data to the API endpoint for storing in the database
        fetch("http://localhost:5000/api/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmitTransaction} className='form'>
            <div className="form">
                <label>
                    Date And Time :
                    <TextField
                        type='datetime-local'
                        name="Date"
                        value={formData.dateAndTime}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Narration :
                    <TextField
                        type="text"
                        name="narration"
                        value={formData.narration}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Amount :
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formData.amount}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Transaction Type :
                    <TextField
                        id="outlined-helperText"
                        label="Transaction Type"
                        defaultValue="Credit"
                        helperText="select from Credit / Debit"
                        value={formData.transactionType}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Reference Number :
                    <TextField
                        id="outlined-number"
                        label="Reference Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formData.referenceNumber}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Available Balance :
                    <TextField
                        id="outlined-number"
                        label="Available Balance"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formData.availableBalance}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Beneficiary Account Number :
                    <TextField
                        id="outlined-number"
                        label="Beneficiary Account Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formData.beneficiaryAccountNumber}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Beneficiary Name :
                    <TextField
                        type="text"
                        name="Beneficiary Name"
                        value={formData.beneficiaryName}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Remitter Account Number :
                    <TextField
                        id="outlined-number"
                        label="Remitter Account Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formData.remitterAccountNumber}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr />
                <br />
                <label>
                    Remitter Name
                    <TextField
                        type="text"
                        name="Remitter Name"
                        value={formData.remitterName}
                        onChange={handleChangeTransaction}
                    />
                </label>
                <hr/>
                <br/>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
};

export default Form;