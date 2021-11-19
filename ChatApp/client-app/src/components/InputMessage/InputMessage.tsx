import React from 'react';
import {Button, FormGroup, Input} from "reactstrap";

import "./InputMessage.css"

const InputMessage: React.FC = () => {
    return (
        <div className={"input_message_wrapper"}>
            <FormGroup className={"input_message"}>
                <Input
                    placeholder={"Input message"}
                    className={"input_"}
                    id="exampleText"
                    name="text"
                    type="textarea"
                />
            </FormGroup>
            <Button className={"send_btn"}>Send</Button>
        </div>
    );
};

export default InputMessage;
