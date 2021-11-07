import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";

const ChatRoomPage: React.FC = () => {
    const { id } = useParams<{id?: string}>();
    const {room, error, loading} = useUserSelector(x => x.rooms);
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
