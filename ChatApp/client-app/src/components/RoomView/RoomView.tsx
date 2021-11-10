import React, {useEffect, useState} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {Message} from "../../types/dataTypes";
import Loader from "../Loader/Loader";
import MessageView from "../MessageView/MessageView";
import * as signalR from "@microsoft/signalr";

import "./RoomView.css"


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.start();

const RoomView = () => {
    console.log("render room view")
    const {room, loading, error} = useUserSelector(x => x.rooms)
    const [messages, setMessages] = useState<Message[]>([]);

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

    if (room) {

        return (
            <div className={"room_view_main"}>
                <MessageView messages={messages}/>
                <div> input message </div>
            </div>
        )
    }
    return (
        <div>
            <h1>asd {error}</h1>
        </div>
    );
};

export default RoomView;
