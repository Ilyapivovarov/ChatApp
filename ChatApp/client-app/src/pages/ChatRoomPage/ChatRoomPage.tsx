import React, {useEffect} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";

const ChatRoomPage: React.FC = () => {
    
    const {fetchRoom} = useRoomActionCreator();

    useEffect(() => {
        fetchRoom(1);
    }, [])

    const {room} = useUserSelector(x => x.rooms);
    
    return (
        <div>
            <h1>Chat room page {room?.admin?.id}</h1>
        </div>
    );
};

export default ChatRoomPage;
