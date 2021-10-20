import React, {useState} from "react";
import * as signalR from "@microsoft/signalr";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {ChatMessage} from "../types/ChatMessage";
import Dialog from "./Dialog,tsx";

interface TextBox {
    sendMessage : any,
}

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
   
    
    const sendMessage = () => {
        let msg = new ChatMessage();
        msg.id = Date.now().valueOf()
        msg.message = "asf";
        msg.author = "fas";

     //   hubConnection.invoke<ChatMessage>("receiveMessage", msg)
    }

   

    // Builds the SignalR connection, mapping it to /chat
   
    const TextBox: React.FC<TextBox> = (prop) => {
        let text = "";
        let author = ""
        
        const Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
            text = e.target.value
        }

        const AuthorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            author = e.target.value
        }

        const submitForm = () => {
            let msg = new ChatMessage();
            msg.id = Date.now().valueOf()
            msg.message = text;
            msg.author = author;

            //prop.sendMessage()

           /// hubConnection.invoke<ChatMessage>("receiveMessage", msg)
        };
        
        return <>
            <Form >
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input id="exampleEmail" placeholder="with a placeholder" onChange={AuthorHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText" >Text Area</Label>
                    <Input type="textarea" name="text" id="exampleText" onChange={Handler}/>
                </FormGroup>
            </Form>

            <Button onClick={submitForm}>Submit</Button>
            <Dialog messages={messages} author={author}/>
        </>
    }
    
    return <>
        <TextBox sendMessage={sendMessage}/>
    </>;
};

export default Chat;