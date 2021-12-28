import React from 'react';
import Loader from "../../components/Loader/Loader";
import ChatCard from "../../components/ChatCard/ChatCard";
import {useFetchChatsQuery} from "../../servies/chatService";

const ChatListPage : React.FC = () => {
    const {isLoading, data:chats} = useFetchChatsQuery()
    return (
        <div className={"page"}>
            {isLoading && <Loader/>}
            {chats && chats.length > 0 &&
                chats.map(chat => <ChatCard key={chat.id} chatName={"afsfas"} chat={chat}/>)}
        </div>
    );
};

export default ChatListPage;
