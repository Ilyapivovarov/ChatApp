import React, {useEffect, useState} from 'react';
import {Message, Room} from "../../types/dataTypes";
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";
import InputMessage from "../InputMessage/InputMessage";

import "./RoomView.css"
import {useCustomSelector} from "../../hooks/useCustomSelector";
import Loader from "../Loader/Loader";


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.start();


const RoomView: React.FC = () => {
    const {isLoading, room, error} = useCustomSelector(x => x.room)
    const [messages, setMessages] = useState<Message[]>(room == undefined ? [] : room.messages);
    useEffect(() => {
        hubConnection.on("receiveMessage", (message: Message) => {
            return setMessages(x => [...x, message])
        });
    }, []);


    if (isLoading)
        return <Loader/>

    return (
        <div className={"room_view_main"}>
            <MessageView messages={messages}/>
            <InputMessage/>
        </div>
    )


};

export default RoomView;
