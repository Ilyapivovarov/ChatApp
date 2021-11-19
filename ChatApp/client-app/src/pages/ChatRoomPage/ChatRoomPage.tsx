import React, {useEffect, useState} from 'react';
import {useRoomActions} from "../../hooks/useRoomActions";
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";

import "./ChatRoomPage.css"
import {useCustomSelector} from "../../hooks/useCustomSelector";
import Loader from "../../components/Loader/Loader";
import {Room} from "../../types/dataTypes";

const ChatRoomPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {fetchRoom} = useRoomActions()
    const {room} = useCustomSelector(x => x.room)
    const [roomState, setRoomState] = useState<Room | null>(room);

    useEffect(() => {
        fetchRoom(id);
    }, []);

    useEffect(() => {
        if(room != null)
            setRoomState(room);
    }, [room]);

    if (roomState)
        return (
            <div className={"room_view_page"}>
                <h1>Room name: {id}</h1>
                <RoomView room={roomState}/>
            </div>
        )
    
    return (
       <Loader/>
    )
};

export default ChatRoomPage;
