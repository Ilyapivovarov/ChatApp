import React from 'react';
import {Chat} from "../../types/dataTypes";
import {useNavigate} from "react-router-dom";

import "./ChatCard.css"

interface ChatCardProp {
    chatName: string,
    chat: Chat
}

const ChatCard: React.FC<ChatCardProp> = (props) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate( `chat/${props.chat.id}`)
    }

    const removeChatHandler = () => {
        console.log(`remove chat with id ${props.chat.id}`)
    }
    
    const lastMessage = props.chat.messages[props.chat.messages.length - 1].body;
    
    return (
        <div className={"chat-card shadow br5"}>
            <div onClick={onClickHandler} className={"chat-card-header pd10"}>
                {props.chatName}
            </div>
            <div onClick={onClickHandler} className={"chat-card-body pd10"}>
                {lastMessage}
            </div>
            <div onClick={removeChatHandler} className={"chat-card-footer pd10"} >
                Remove chat
            </div>
        </div>
    );
};

export default ChatCard;
