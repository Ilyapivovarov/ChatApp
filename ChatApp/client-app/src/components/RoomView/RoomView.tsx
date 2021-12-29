import React, {useEffect, useState} from 'react';
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";
import InputMessage from "../InputMessage/InputMessage";

import "./RoomView.css"
import {Chat, Message} from "../../common/types";
import {BaseUrl} from "../../common/global";


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${BaseUrl}hub/chat`)
    .build();

hubConnection.start();

interface RoomViewProps {
    chat: Chat
}

const RoomView: React.FC<RoomViewProps> = (props) => {

    const [messages, setMessages] = useState<Message[]>(props.chat.messages);
    console.log(props.chat)
    useEffect(() => {
        hubConnection.on("receiveMessage", (message: Message) => {
            console.log(message)
            return setMessages(x => [...x, message])
        });
    }, []);
    
    return (
        <div className={"room_view_main"}>
            <MessageView messages={messages}/>
            <InputMessage chatId={props.chat.id}/>
        </div>
    )
};

export {RoomView};
