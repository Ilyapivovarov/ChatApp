import React, {useEffect} from 'react';
import {useRoomActionCreator} from "../../hooks/useRoom";
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";

import "./ChatRoomPage.css"
import {authUser} from "../../store/action-creators/user";

const ChatRoomPage: React.FC = () => {
    console.log("render")
    const {id} = useParams<{ id: string }>();
    const {fetchRoom} = useRoomActionCreator();
    useEffect(() => {
        fetchRoom(id);
    
    }, []);
    return (<RoomView />)
};

export default ChatRoomPage;
