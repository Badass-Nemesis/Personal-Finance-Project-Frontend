import React, { useState } from 'react';
import axios from 'axios';
import auth from '../../Auth';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import withAuth from '../../WithAuth';

const Chatbot = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const sendMessage = async () => {
        if (inputText) {
            const newMessage = { message: inputText, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputText('');
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}api/chatadvice/message`, {
                    message: inputText,
                }, { headers: { 'x-auth-token': auth.getToken() } });
                const botMessage = { message: response.data, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const renderMessages = () => {
        return messages.map((message, index) => {
            const classes = message.sender === 'user' ? 'sent' : 'received';
            return (
                <div key={index} className={`message ${classes}`}>
                    {message.message}
                </div>
            );
        });
    };

    return (

        <div className="chatbot-container">
            <Button onClick={handleClickOpen('paper')}>
                <img className='chatbotimg' src="https://cdn-icons-png.flaticon.com/512/1698/1698586.png" alt='Chatbot.png'/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Chatbot</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <div className="chatbot-header">
                            {/* <div>Chatbot</div> */}
                        </div>
                        <div className="chatbot-messages">{renderMessages()}</div>
                        <div className="chatbot-input-container">
                            <TextField id="outlined-basic" variant="outlined"
                                placeholder="Type your message..."
                                value={inputText}
                                onChange={(event) => setInputText(event.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {/* <input
                                type="text"
                            /> */}
                            <Button onClick={sendMessage}>Send</Button>
                        </div>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default withAuth(Chatbot);
