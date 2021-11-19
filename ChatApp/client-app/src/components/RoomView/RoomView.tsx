import React, {useEffect, useState} from 'react';
import {Message, Room} from "../../types/dataTypes";
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";

import "./RoomView.css"
import InputMessage from "../InputMessage/InputMessage";


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.start();

interface RoomViewProps {
    room: Room
}

const RoomView : React.FC<RoomViewProps> = (props) => {
    const [messages, setMessages] = useState<Message[]>(props.room.messages);
    useEffect(() => {
        hubConnection.on("receiveMessage", (message: Message) => {
            return setMessages(x => [...x, message])
        });
    }, []);
    
    return (
        <div className={"room_view_main"}>
            <MessageView messages={messages}/>
            <InputMessage/>
        </div>
    )

};

export default RoomView;
