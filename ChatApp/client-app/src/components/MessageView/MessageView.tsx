import React, {useEffect} from 'react';
import {Message} from "../../types/dataTypes";

import "./MessageView.css"
import {useAppSelector} from "../../hooks/redux";


interface DialogProps {
    messages: Message[]
}

const MyMessage: React.FC<Message> = (prop: Message) => (
    <div className="message output" key={prop.id}>
        <div>{prop.body}</div>
        <div>From: {prop.author.userName}</div>
    </div>
);

const InputMessage: React.FC<Message> = (inputProp: Message) => (
    <div className="message input" key={inputProp.author.id}>
        <div>{inputProp.body}</div>
        <div>From: {inputProp.author.userName}</div>
    </div>
);

const MessageView: React.FC<DialogProps> = (props: DialogProps) => {
    const {currentUser} = useAppSelector(x => x.authReducer);

    useEffect(() => {
        const element = document.querySelector(".wrapper_scroll_bottom")
        if (element) {

            element.scrollIntoView({
                behavior: 'auto',
                block: 'end',
            })
        }
    }, [props]);


    return (
        <div className="wrap_scroll_bottom">
            <div className="container_scroll_bottom" id="containerScroll">
                {
                    props.messages.map((item, i) => {
                        if (item.author.id == currentUser?.id) {
                            return <MyMessage author={item.author} body={item.body} id={item.id} key={i}/>

                        } else
                            return <InputMessage author={item.author} body={item.body} id={item.id} key={i}/>

                    })
                }
                <div className="wrapper_scroll_bottom"/>
            </div>
        </div>
    );


}

export default MessageView;
