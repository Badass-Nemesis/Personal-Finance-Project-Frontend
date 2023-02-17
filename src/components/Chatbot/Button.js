import React, { useState } from 'react';
import Chatbot from './Chatbot';

function ChatbotButton() {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <>
            <button onClick={toggleChatbot}>
                <img className='chatbotimg' src="https://cdn-icons-png.flaticon.com/512/1698/1698586.png" />
            </button>
            {showChatbot && <Chatbot onClose={toggleChatbot} />}
        </>
    );
}

export default ChatbotButton;
