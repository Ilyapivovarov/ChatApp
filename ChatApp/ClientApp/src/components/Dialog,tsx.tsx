import React from "react";
import {Table} from "reactstrap";
import {ChatMessage} from "../types/ChatMessage";

interface DialogProps {
    author: string,
    messages: Array<ChatMessage>
}


const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    const MessageItem: React.FC<ChatMessage> = (prop: ChatMessage) => {
        return <>
            <tr key={prop.id}>
                <td>From: {prop.author}</td>
                
                <td style={{textAlign:"right"}}>{prop.message}</td>
            </tr>
        </>
    };

    return <div style={{minHeight: "50vh", border: "solid 1px #ced4da"}}>
        <Table >
            <tbody>
            {props.messages.map((x, key) => (
                <MessageItem key={key} id={x.id} message={x.message} author={x.author}/>))
            }
            </tbody>
        </Table>
    </div>
   
}

export default Dialog