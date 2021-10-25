import React from "react";
import {ChatMessage} from "../types/ChatMessage";
import "./dialog.css"

interface DialogProps {
    author: string,
    messages: Array<ChatMessage>
}

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    
    const MyMessage: React.FC<ChatMessage> = (prop: ChatMessage) => (
        <div className={"message output"} style={{background: "lightgreen"}} key={prop.id}>
            <div>{prop.message}</div>
            <div>From: {prop.author}</div>
        </div>
    );

    const InputMessage: React.FC<ChatMessage> = (inputProp: ChatMessage) => (
        <div className={"message input"} key={inputProp.id}>
            <div>{inputProp.message}</div>
            <div>From: {inputProp.author}</div>
        </div>
    );

    return <div className="dialog">
        <div className="dialog-content">
            <span>Chat</span>
            <ul>
                {props.messages.map((item, i) => {
                    console.log(props.author, item.author)
                    if (props.author == item.author){
                        return <li key={i}>
                            <MyMessage message={item.message} author={item.author} id={i}/>
                        </li>
                    }
                        
                    else 
                        return <li key={i}>
                            <InputMessage message={item.message} author={item.author} id={i}/>
                        </li>
                })
                }
            </ul>
        </div>
    </div>
}

export default Dialog