import React, {useState} from "react";
import * as signalR from "@microsoft/signalr";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {ChatMessage} from "../types/ChatMessage";
import Dialog from "./Dialog,tsx";
import axios from "axios";


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.start();

const Chat: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    hubConnection.on("receiveMessage", (message: ChatMessage) => {
        setMessages(messages => {
            let a = messages.filter(x => x.id == message.id)
            if (a.length > 0)
                return messages;
            console.log(message, messages, [...messages, message])
            return [...messages, message]
        })
    });

    const TextBox: React.FC = () => {

        const [isRemember, setRemember] = useState<boolean>(false);
        const [text, setText] = useState<string>("");
        
        const [author, setAuthor] = useState<string>( "");
        


        const submitForm = () => {
            let msg = new ChatMessage();
            msg.id = Date.now().valueOf()

            if (text.length == 0 || author.length == 0)
                return (
                    console.log("!!!!", text.length, author.length)
                );

            msg.message = text;
            msg.author = author;

            if (isRemember) {
                localStorage.setItem('user', isRemember ? author : '');
            }

            axios.post<ChatMessage>("/chat/send", msg)
                .then(x => console.log(x))
                .catch(error => console.log(error))
        };

        return <>
            <Dialog messages={messages} author={author}/>
            <div>
                <FormGroup className={"form-group"}>
                    <Input required={true} id="exampleEmail" placeholder="Enter your name"
                           onChange={(e) => {
                               e.persist()
                               setAuthor(x => e.target.value)
                           }}/>
                </FormGroup>
                <FormGroup check className={"form-group"}>
                    <Label check>
                        <Input onReset={
                            () => {
                                let user = localStorage.getItem("user");
                                return user == null ? "" : user.toString()
                            }
                        } onChange={() => setRemember(flag => !flag)} type="checkbox" value={(isRemember as any)}/>
                    </Label>
                </FormGroup>
                <FormGroup className={"form-group"}>
                    <Input required={true} type="textarea" name="text" id="exampleText" value={text}
                           placeholder="Enter your message"
                           onChange={(e) => {
                               e.persist()
                               setText(() => e.target.value)
                           }}/>
                </FormGroup>

                <div style={{width: "100%", textAlign: "right"}}>
                    <Button onClick={submitForm}>Submit</Button>
                </div>
            </div>


        </>
    }

    return <>
        <TextBox/>
    </>;
};

export default Chat;