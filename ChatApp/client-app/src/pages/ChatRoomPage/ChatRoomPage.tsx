import React from 'react';
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";
import Loader from "../../components/Loader/Loader";
import {useFetchRoomQuery} from "../../servies/roomService";

import "./ChatRoomPage.css"

const ChatRoomPage: React.FC = () => {
    const {id} = useParams()
    const {error, isLoading, data: room} = useFetchRoomQuery(id!);
    return (
        <>
            {isLoading && <Loader/>}
            {room && <div className={"page"}>
                <h1>Room name: {id}</h1>
                <RoomView room={room}/>
            </div>}
            {error && <h1>Error while loding room</h1>}

        </>
    )
};

export default ChatRoomPage;
