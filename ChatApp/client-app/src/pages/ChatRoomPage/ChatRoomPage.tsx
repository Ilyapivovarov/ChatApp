import React from 'react';
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {useFetchRoomQuery} from "../../servies/roomService";

import "./ChatRoomPage.css"
import {RoomView} from "../../components/RoomView/RoomView";

const ChatRoomPage: React.FC = () => {
    const {id} = useParams()
    const {error, isLoading, data: chat} = useFetchRoomQuery(id!);
    return (
        <>
            {isLoading && <Loader/>}
            {chat && <div className={"page"}>
                <h1>Chat name: {id}</h1>
                <RoomView chat={chat}/>
            </div>}
            {error && <h1>Error while loding room</h1>}
        </>
    )
};

export default ChatRoomPage;
