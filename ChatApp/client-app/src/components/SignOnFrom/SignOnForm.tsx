import React, {useState} from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import CustomInput from "../CustomInput/CustomInput";

const InputUserName : React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    return(
        <Input value={userName} onChange={(event => {
            event.persist();
            setUserName(event.target.value);
        })} />
    );
}

const SignOnForm: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <CustomInput valid={true} value={userName} type={"text"} placeholder={"Enter username"}
                             required={true} onChange={(e) => {
                    setUserName(x => e.target.value)
                }}/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <CustomInput valid={true} value={password} type={"password"} placeholder={"Enter password"}
                             onChange={(e) => {
                                 e.persist();
                                 setPassword(x => e.target.value)
                             }}/>
            </FormGroup>
            
            <Test password={password}/>
            <div>

            </div>
            <Button>
                Submit
            </Button>
        </Form>
    );
};

export default SignOnForm;
