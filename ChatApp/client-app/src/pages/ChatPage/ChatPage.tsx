import React from 'react';
import {useParams} from "react-router-dom";
import {useFetchChatQuery} from "../../servies/chatService";
import {RoomView} from "../../components/RoomView/RoomView";
import Loader from "../../components/Loader/Loader";

const ChatPage : React.FC = () => {
    const {id} = useParams<string>();
    const {isLoading, error, data: chat} = useFetchChatQuery(id!);
    return (
        <div className={"page"}>
            {isLoading && <Loader/>}
            {chat && <RoomView chat={chat}/>}
        </div>
    );
};

export default ChatPage;
