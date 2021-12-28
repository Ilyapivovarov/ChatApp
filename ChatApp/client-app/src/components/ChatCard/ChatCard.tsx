import React from 'react';
import {useNavigate} from "react-router-dom";
import {Chat} from "../../common/types";

import "./ChatCard.css"

interface ChatCardProp {
    chatName: string,
    chat: Chat
}

const ChatCard: React.FC<ChatCardProp> = (props) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate( `/chats/${props.chat.id}`)
    }
    const removeChatHandler = () => {
        console.log(`remove chat with id ${props.chat.id}`)
    }
    
    return (
        <div className={"chat-card shadow br5"}>
            <div onClick={onClickHandler} className={"chat-card-header pd10"}>
                {props.chatName}
            </div>
            <div onClick={onClickHandler} className={"chat-card-body pd10"}>
                Last message
            </div>
            <div onClick={removeChatHandler} className={"chat-card-footer pd10"} >
                Remove chat
            </div>
        </div>
    );
};

export default ChatCard;
