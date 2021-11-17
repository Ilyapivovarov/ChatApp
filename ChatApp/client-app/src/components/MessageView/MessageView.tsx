import React from 'react';
import {Message} from "../../types/dataTypes";

import "./MessageView.css"

interface DialogProps {
    messages: Message[]
}

const MessageView: React.FC<DialogProps> = (props: DialogProps) => {

    const MyMessage: React.FC<Message> = (prop: Message) => (
        <div className={"message output"} style={{background: "lightgreen"}} key={prop.id}>
            <div>{prop.body}</div>
            <div>From: {prop.author.userName}</div>
        </div>
    );

    const InputMessage: React.FC<Message> = (inputProp: Message) => (
        <div className={"message input"} key={inputProp.author.id}>
            <div>{inputProp.body}</div>
            <div>From: {inputProp.author.userName}</div>
        </div>
    );

    return <div className="dialog">
        <div className="dialog-content">
            <ul>
                {
                    props.messages.map((item, i) => {

                    if (item.author.id == 1) {
                        return <li key={i}>
                            <MyMessage author={item.author} body={item.body} id={item.id} key={i}/>
                        </li>
                    } else
                        return <li key={i}>
                            <InputMessage author={item.author} body={item.body} id={item.id} key={i}/>
                        </li>
                })
                
                }
            </ul>
        </div>
    </div>
}

export default MessageView;
