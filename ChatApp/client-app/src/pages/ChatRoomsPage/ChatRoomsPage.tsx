import React from 'react';
import {Chat} from "../../types/dataTypes";
import ChatCard from "../../components/ChatCard/ChatCard";

const ChatRoomsPage: React.FC = () => {
    const chats: Chat[] = [{
        id: 1,
        messages: [{
            author: {
                userName: "admin",
                id: 1,
                exp: 123
            },
            body: 'body'
        }],
        recipient: {
            userName: "recipient",
            id: 1,
            exp: 123
        },
        sender: {
            userName: "sender",
            id: 1,
            exp: 123
        }
    },
        {
            id: 2,
            messages: [{
                author: {
                    userName: "admin",
                    id: 1,
                    exp: 123
                },
                body: 'body'
            }],
            recipient: {
                userName: "recipient",
                id: 1,
                exp: 123
            },
            sender: {
                userName: "sender",
                id: 1,
                exp: 123
            }
        }
    ]

    return (
        <div className={"page"}>
            {chats && chats.map(chat => <ChatCard key={chat.id} chatName={chat.recipient.userName} chat={chat}/>)}
        </div>
    );
};

export default ChatRoomsPage;
