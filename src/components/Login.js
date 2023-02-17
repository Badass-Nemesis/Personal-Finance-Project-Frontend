import React, { useState } from 'react'
import axios from 'axios';

function Login (){
    const [email, setEmail] = useState(null);
    const [passw, setPassw] = useState(null);
    // const [dataInput, setDataInput] = useState(null);
    async function submitThis() {
        const info = {
            email: email,
            password: passw
        };
        const token = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth`, info);
        console.log(token);
    }
    return (
        <div>
            <form action="" onSubmit={submitThis}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passw">Password</label>
                    <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;