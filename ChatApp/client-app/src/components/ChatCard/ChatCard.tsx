import React from 'react';
import {Chat} from "../../types/dataTypes";
import {useNavigate} from "react-router-dom";

interface ChatCardProp {
    chatName: string,
    chat: Chat
}

const ChatCard: React.FC<ChatCardProp> = (props) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate( `chat/${props.chat.id}`)
    }
    
    return (
        <div className={"chat-card"} onClick={onClickHandler}>
            <div className={"chat-card-header"}>
                {props.chatName}
            </div>
            <div className={"chat-card-body"}>
                {props.chat.messages}
            </div>
            <div className={"chat-card-footer"}>
                Remove chat
            </div>
        </div>
    );
};

export default ChatCard;
