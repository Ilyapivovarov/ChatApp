import React, {useEffect} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import "./ChatRoomPage.css"


const ChatRoomPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const {fetchRoom} = useRoomActionCreator();
    const {room, loading, error} = useUserSelector(x => x.rooms)
    useEffect(() => {
        fetchRoom(id);
    }, []);
    
    if (loading){
        return (
            <Loader />
        );
    }
    
    if (room) {
        return (
            <div>
                <h1>{room.admin.userName}</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>{error}</h1>
        </div>
    );
};

export default ChatRoomPage;
