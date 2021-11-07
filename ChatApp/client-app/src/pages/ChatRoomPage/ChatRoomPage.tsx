import React, {useEffect} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";

const ChatRoomPage: React.FC = () => {
    const {room} = useUserSelector(x => x.rooms);
    const {fetchRoom} = useRoomActionCreator();
    
    useEffect(() => {
        fetchRoom(1);
    },[] )
    
    return (
        <div>
            <h1>Chat room page {room}</h1>
        </div>
    );
};

export default ChatRoomPage;
