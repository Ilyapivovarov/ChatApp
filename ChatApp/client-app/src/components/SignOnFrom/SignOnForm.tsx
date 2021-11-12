import React from 'react';
import {Button, Form, FormFeedback, FormGroup, Input} from "reactstrap";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import InputUserName from "../InputUserName/InputUserName";

import "./SignOnFrom.css"


const InputPassword: React.FC = () => {
    const {enterPassword} = useSignOn();
    const {password} = useUserSelector(x => x.signOn);
    if (password != null && password.length > 5) {
        return (
            <>
                <Input valid value={password} onChange={(event => {
                    event.persist();
                    enterPassword(event.target.value);
                })}/>
            </>
        );
    }
    return (
        <>
            <Input invalid={password != null} value={password ?? ""} onChange={(event => {
                event.persist();
                enterPassword(event.target.value);
            })}/>
            <FormFeedback hidden={password == null}>
                Error password
            </FormFeedback>
        </>
    );
}

const InputConfirmPassword: React.FC = () => {
    const {enterConfirmPassword} = useSignOn();
    const {confirmPassword, password} = useUserSelector(x => x.signOn);

    if (confirmPassword != null && confirmPassword.length > 5 && password != null && password.length > 5
        && confirmPassword == password) {
        return (
            <>
                <Input valid value={confirmPassword} onChange={(event => {
                    event.persist();
                    enterConfirmPassword(event.target.value);
                })}/>
            </>
        );
    }
    return (
        <>
            <Input invalid value={confirmPassword ?? ""} onChange={(event => {
                event.persist();
                enterConfirmPassword(event.target.value);
            })}/>
            <FormFeedback>
                Error confirm password
            </FormFeedback>
        </>
    );
}

const SignOnForm: React.FC = () => {
    const {submitForm} = useSignOn()
    const s = useUserSelector(x => x.signOn)
    return (
        <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                <InputUserName/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                <InputPassword/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                <InputConfirmPassword/>
            </FormGroup>
            <Button
                onSubmit={() => submitForm({
                    password: s.password,
                    userName: s.userName,
                    confirmPassword: s.confirmPassword
                })}>
                Submit
            </Button>
            <div>
                {s.error}
            </div>
        </Form>

    );
};

export default SignOnForm;
