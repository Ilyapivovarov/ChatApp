import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import {useParams} from "react-router-dom";

import "./InputMessage.css"
import Axios from "../../common/axios";
import {Message} from "../../types/dataTypes";


const InputMessage: React.FC = () => {
    const {currentUser} = useCustomSelector(x => x.auth)
    const [body, setBody] = useState<string>("");
    const {id} = useParams();

    const sendMessage = (message: Message) => {
        Axios.post("room/send-message/" + id, message)
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
            sendMessage({author: currentUser, body: body});

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
