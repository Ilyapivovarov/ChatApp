import React from 'react';
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";
import Loader from "../../components/Loader/Loader";

import "./ChatRoomPage.css"
import {useFetchRoomQuery} from "../../servies/roomService";


const ChatRoomPage: React.FC = () => {
    const {id} = useParams<string>()
    const {error, isLoading, data} = useFetchRoomQuery(1);

    console.log(data)
    if (isLoading) {
        return (<Loader/>);
    }

    if (data != undefined && data.value != null)
        return (
            <div className={"page"}>
                <h1>Room name: {id}</h1>
                <RoomView room={data.value}/>
            </div>
        )
    
    return (<h1>{error}</h1>)
};

export default ChatRoomPage;
