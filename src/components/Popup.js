import React, { useState } from 'react';
import auth from '../Auth';
import withAuth from '../WithAuth';

function PopupButton() {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState('');

    const handleClick = async () => {
        async function datasetting() {
            await axios.get(`${process.env.REACT_APP_BASE_URL}api/chatadvice/ask`, {
                headers: { 'x-auth-token': auth.getToken() }
            }).then(response => {
                // console.log(response.data);
                setData(response.data);
            });
        }
        await datasetting();
        setShowPopup(true);
    };

    return (
        <div>
            <button onClick={handleClick}>Open Popup</button>
            {showPopup && (
                <div className="popup">
                    <h2>Popup Content</h2>
                    <p>Some text to print</p>
                    {data}
                    <button onClick={() => window.print()}>Print</button>
                </div>
            )}
        </div>
    );
}

export default withAuth(PopupButton);
