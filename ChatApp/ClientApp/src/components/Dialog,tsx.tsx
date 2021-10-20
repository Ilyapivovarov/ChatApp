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
                <td>{props.author === prop.author ? "" : prop.message}</td>
                <td></td>
                <td>{props.author !== prop.author ? "" : prop.message}</td>
            </tr>
        </>
    };
    
    return <Table >
        <tbody>
        {props.messages.map((x, key) => (
            <MessageItem key={key} id={x.id} message={x.message} author={x.author}/>))
        }
        </tbody>
    </Table>
}

export default Dialog