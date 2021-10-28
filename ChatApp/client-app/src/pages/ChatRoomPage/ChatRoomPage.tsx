import React from 'react';
import {useParams} from "react-router-dom";

const ChatRoomPage: React.FC = () => {
    const { id } = useParams<{id?: string}>();
    
    return (
        <div>
            <h1>Chat room page {id}</h1>
        </div>
    );
};

export default ChatRoomPage;
