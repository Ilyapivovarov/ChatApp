import React, {useEffect} from 'react';

import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";

import "./ChatRoomPage.css"

const ChatRoomPage: React.FC = () => {
    console.log("render")
    const {id} = useParams<{ id: string }>();
    const fetchRoom = (id : string) => console.log(id)
    useEffect(() => {
        fetchRoom(id);
    }, []);
    return (
        <div className={"room_view_page"}>
            <h1>Room name: </h1>
            <RoomView />
        </div>
    )
};

export default ChatRoomPage;
