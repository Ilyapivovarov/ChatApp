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

    const [messages , setMessages] = useState<ChatMessage[]>([]);
    
    hubConnection.on("receiveMessage", (message : ChatMessage) => {
        setMessages(messages => {
            
            let a = messages.filter(x => x.id == message.id)
            
            if(a.length > 0)
                return messages;
                
            console.log(message, messages, [...messages, message])
            
            return [...messages, message]
        })
    });
    
    const TextBox: React.FC = () => {
        let text = "";
        let author = ""
        
        const [errorMsg, setErrorMsg] = useState<string>("");
        
        const Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
            text = e.target.value
        }

        const AuthorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            author = e.target.value
        }

        const submitForm = () => {
            let msg = new ChatMessage();
            msg.id = Date.now().valueOf()
            
            if (text.length == 0 || author.length == 0)
                return (
                    console.log("!!!!")
                );
                
            msg.message = text;
            msg.author = author;
            
            axios.post<ChatMessage>("/chat/send", msg)
                .then(x => console.log(x))
                .catch(error => console.log(error))
        };
        
        return <>

            <Dialog messages={messages} author={author}/>
            <Form required={true}>
                <FormGroup >
                    <Label for="exampleEmail">Email</Label>
                    <Input required={true} id="exampleEmail" placeholder="with a placeholder" onChange={AuthorHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText" >Text Area</Label>
                    <Input required={true} type="textarea" name="text" id="exampleText" onChange={Handler}/>
                </FormGroup>
                <div style={{width: "100%", textAlign: "right"}}>
                    <Button onClick={submitForm}>Submit</Button>
                </div>
            </Form>
            
            
        </>
    }
    
    return <>
        <TextBox />
    </>;
};

export default Chat;