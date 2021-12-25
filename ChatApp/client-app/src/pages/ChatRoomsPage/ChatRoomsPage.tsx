import React from 'react';
import ChatCard from "../../components/ChatCard/ChatCard";
import {useFetchRoomsQuery} from "../../servies/roomService";
import Loader from "../../components/Loader/Loader";

const ChatRoomsPage: React.FC = () => {
    // 2021076
    const {isLoading, data:chats} = useFetchRoomsQuery()
    console.log(chats)
    return (
        <div className={"page"}>
            {isLoading && <Loader/>}
            {chats && chats.length > 0 && 
                chats.map(chat => <ChatCard key={chat.id} chatName={"afsfas"} chat={chat}/>)}
        </div>
    );
};

export default ChatRoomsPage;
