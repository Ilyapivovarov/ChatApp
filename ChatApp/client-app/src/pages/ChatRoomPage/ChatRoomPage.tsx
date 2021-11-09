import React, {useEffect, useState} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import * as signalR from "@microsoft/signalr";
import MessageView from "../../components/MessageView/MessageView";
import {Message} from "../../types/dataTypes";

import "./ChatRoomPage.css"

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

const ChatRoomPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const {fetchRoom} = useRoomActionCreator();
    const {room, loading, error} = useUserSelector(x => x.rooms)
    useEffect(() => {
        fetchRoom(id);
    }, []);

    const [messages, setMessages] = useState<Message[]>([]);

    hubConnection.on("receiveMessage", (message: Message) => {
        setMessages(messages => {
            let a = messages.filter(x => x.id == message.id)
            if (a.length > 0)
                return messages;
            console.log(message, messages, [...messages, message])
            return [...messages, message]
        })
    });
    
    if (loading){
        return (
            <Loader />
        );
    }
    
    if (room) {
        console.log(messages)
        return (
            <div>
                <MessageView messages={[]} />
            </div>
        )
    }
    return (
        <div>
            <h1>{error}</h1>
        </div>
    );
};

export default ChatRoomPage;
