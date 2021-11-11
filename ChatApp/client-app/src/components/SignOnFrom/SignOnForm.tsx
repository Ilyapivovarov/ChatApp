import React, {useEffect, useState} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input} from "reactstrap";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";

const InputUserName: React.FC = () => {
    const {enterUsername} = useSignOn();
    const {userName} = useUserSelector(x => x.signOn);
    if (userName != null && userName.length > 5) {
        return (
            <>
                <Input valid value={userName} onChange={(event => {
                    event.persist();
                    enterUsername(event.target.value);
                })}/>
                <FormFeedback valid>
                    Username correct
                </FormFeedback>
            </>
        );
    }
    return (
        <>
            <Input invalid value={userName ?? ""} onChange={(event => {
                event.persist();
                enterUsername(event.target.value);
            })}/>
            <FormFeedback>
                Error username
            </FormFeedback>
        </>
    );
}

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
                <FormFeedback valid>
                    Password correct
                </FormFeedback>
            </>
        );
    }
    return (
        <>
            <Input invalid value={password ?? ""} onChange={(event => {
                event.persist();
                enterPassword(event.target.value);
            })}/>
            <FormFeedback>
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
                <FormFeedback valid>
                    Confirm password correct
                </FormFeedback>
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
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputUserName />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputPassword/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <InputConfirmPassword/>
            </FormGroup>
            <Button onClick={() => submitForm({password: s.password, userName: s.userName, confirmPassword: s.confirmPassword})}>
                Submit
            </Button>
            <div>
                {s.error}
            </div>
        </Form>
        
    );
};

export default SignOnForm;
