import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import RoomView from "../../components/RoomView/RoomView";
import {useActions} from "../../hooks/useActions";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import Loader from "../../components/Loader/Loader";
import axios from "../../common/http-common"

import "./ChatRoomPage.css"
import {RequestResult} from "../../common/RequestResult";
import {Room} from "../../types/dataTypes";


const ChatRoomPage: React.FC = () => {
    const {id} = useParams()
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        axios.get<RequestResult<Room>>("room/" + id)
            .then(r => {
                if (r.data.isSuccess) {
                    setRoom(r.data.value);
                    setLoading(false);
                }

            })
            .catch(e => setError(e))
    }, []);

    if (loading) {
        return (<Loader/>);
    }

    if (room != null)
        return (
            <div className={"room_view_page"}>
                <h1>Room name: {id}</h1>
                <RoomView room={room}/>
            </div>
        )
    
    return (<h1>{error}</h1>)
};

export default ChatRoomPage;
