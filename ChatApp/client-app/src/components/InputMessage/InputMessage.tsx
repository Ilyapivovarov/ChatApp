import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import {useActions} from "../../hooks/useActions";

import "./InputMessage.css"


const InputMessage: React.FC = () => {
    const {currentUser} = useCustomSelector(x => x.auth)
    const {sendMessage} = useActions()
    const [body, setBody] = useState<string>("");

    const changeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }  
    
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        
        if(currentUser != null && body.length > 0)
            sendMessage("1", {author: currentUser, body: body, id: 1});
        
        return false
    }
    
    return (
            <Form className={"input_message_wrapper"}  noValidate onSubmit={submitHandler}>
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
                <Button className={"send_btn"} type={"submit"}>Send</Button>
            </Form>
    );
};

export default InputMessage;
