import React from 'react';
import {Chat} from "../../types/dataTypes";
import ChatCard from "../../components/ChatCard/ChatCard";
import {useFetchRoomsQuery} from "../../servies/roomService";
import Loader from "../../components/Loader/Loader";

const ChatRoomsPage: React.FC = () => {
    // 2021076
    const {isLoading, data:chats} = useFetchRoomsQuery()
    return (
        <div className={"page"}>
            {isLoading && <Loader/>}
            {chats && chats.map(chat => <ChatCard key={chat.id} chatName={chat.recipient.userName} chat={chat}/>)}
        </div>
    );
};

export default ChatRoomsPage;
