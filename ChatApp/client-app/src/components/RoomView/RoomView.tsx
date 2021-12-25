import React, {useEffect, useState} from 'react';
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";
import InputMessage from "../InputMessage/InputMessage";

import "./RoomView.css"
import {Chat, Message} from "../../common/types";
import {BaseUrl} from "../../common/global";



const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${BaseUrl}hub/chat`)
    .configureLogging("warning")
    .build();

hubConnection.start()
    .then(res => console.log(res))
    .catch(e => console.log(e));

interface RoomViewProps {
    chat: Chat
}

const RoomView: React.FC<RoomViewProps> = (props) => {

    const [messages, setMessages] = useState<Message[]>(props.chat.messages);
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

export {RoomView};
