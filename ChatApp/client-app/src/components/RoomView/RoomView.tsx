import React, {useEffect, useState} from 'react';
import {Message} from "../../types/dataTypes";
import Loader from "../Loader/Loader";
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";

import "./RoomView.css"
import InputMessage from "../InputMessage/InputMessage";


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.start();

const RoomView = () => {
    const loading = false;
    const error = false;
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        hubConnection.on("receiveMessage", (message: Message) => {
            return setMessages(x => [...x, message])
        });
    }, [loading]);
    
    useEffect(() => {
        hubConnection.on("receiveMessage", (message: Message) => {
            return setMessages(x => [...x, message])
        });
    }, []);
    console.log(messages, "props")

    if (loading) {
        return (
            <Loader/>
        );
    }
    
    if(error) {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

    return (
        <div className={"room_view_main"}>
            <MessageView messages={messages}/>
            <InputMessage/>
        </div>
    )
    
};

export default RoomView;
