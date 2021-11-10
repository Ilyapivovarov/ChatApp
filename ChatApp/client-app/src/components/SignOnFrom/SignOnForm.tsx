import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useSignOn} from "../../hooks/useSignOn";

const InputUserName: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const {enterUsername} = useSignOn();
    useEffect(() => {
        enterUsername("")
    }, []);
    return (
        <Input value={userName} onChange={(event => {
            event.persist();
            setUserName(event.target.value);
            enterUsername(event.target.value);
        })}/>
    );
}

const InputPassword: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const {enterPassword} = useSignOn();
    useEffect(() => {
        enterPassword("")
    }, []);
    
    return (
        <Input value={userName} onChange={(event => {
            event.persist();
            setUserName(event.target.value);
            enterPassword(event.target.value);
        })}/>
    );
}

const InputConfirmPassword: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const {enterConfirmPassword} = useSignOn();
    useEffect(() => {
        enterConfirmPassword("")
    }, []);
    return (
        <Input value={userName} onChange={(event => {
            event.persist();
            setUserName(event.target.value);
            enterConfirmPassword(event.target.value);
        })}/>
    );
}

const SignOnForm: React.FC = () => {
    return (
        <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputUserName/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputPassword/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputConfirmPassword/>
            </FormGroup>
            <Button>
                Submit
            </Button>
        </Form>
    );
};

export default SignOnForm;
