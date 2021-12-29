import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useParams} from "react-router-dom";
import Axios from "../../common/axios";
import {useAppSelector} from "../../hooks/redux";
import {Message} from "../../common/types";

import "./InputMessage.css"

interface InputMessageProps {
    chatId: number
}

const InputMessage: React.FC<InputMessageProps> = (props) => {
    const {currentUser} = useAppSelector(x => x.authReducer)
    const [body, setBody] = useState<string>("");

    const sendMessage = (message: Message) => {
        Axios.post("message/send", message)
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation();
        }

        if (currentUser != null && body.length > 0) {
            sendMessage({author: currentUser, body: body, chatId: props.chatId, });
            setBody("");
        }
    }

    return (
        <Form className={"input_message_wrapper"} noValidate onSubmit={submitHandler}>
            <FormGroup className={"input_message"}>
                <Input
                    placeholder={"Input message"}
                    className={"input_"}
                    id="exampleText"
                    name="text"
                    type="textarea"
                    value={body}
                    onChange={changeHandler}
                />
            </FormGroup>
            <Button className={"send_btn"} type={"submit"} color={"primary"}>Send</Button>
        </Form>
    );
};

export default InputMessage;
