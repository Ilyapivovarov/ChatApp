import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";
import "./ChatRoomPage.css"

import {useActions} from "../../hooks/useActions";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import Loader from "../../components/Loader/Loader";


const ChatRoomPage: React.FC = () => {
    const {fetchRoom} = useActions()
    const {id} = useParams<{ id: string }>();
    const {isLoading, room} = useCustomSelector(x => x.room)
    useEffect(() => {
        fetchRoom(id)
    }, []);

    if (isLoading && room){
        return (<Loader/>);
    }
    
    console.log("Render page", room)
    return (
        <div className={"room_view_page"}>
            <h1>Room name: {id}</h1>
            <RoomView/>
        </div>
    )
};

export default ChatRoomPage;
