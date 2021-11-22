import React from 'react';
import {Message} from "../../types/dataTypes";
import {useCustomSelector} from "../../hooks/useCustomSelector";

import "./MessageView.css"


interface DialogProps {
    messages: Message[]
}

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

const MessageView: React.FC<DialogProps> = (props: DialogProps) => {
    const {currentUser} = useCustomSelector(x => x.auth);
    if (props.messages.length == 0)
        return <h1>No messages</h1>
    
    return (
        <div className="dialog">
            <div className="dialog-content">
                <ul>
                    {
                        props.messages.map((item, i) => {
                            if (item.author.id == currentUser?.id) {
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
    );


}

export default MessageView;
