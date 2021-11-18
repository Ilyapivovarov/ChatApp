import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Row} from 'reactstrap';
import {useAuthActions} from "../../hooks/useAuthActions";
import {useCustomSelector} from "../../hooks/useStateReader";

import "./AuthForm.css"

const SignInForm: React.FC = () => {
    const {signInUser} = useAuthActions()
    const {error} = useCustomSelector(x => x.auth)
    
    const [userName, setUserName] = useState<string>("");
    const [userNameValid, setUserNameValid] = useState<boolean>();
    const [userNameError, setUserNameError] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordValid, setPasswordValid] = useState<boolean>();
    const [passwordError, setPasswordError] = useState<string>("");

    const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
        validateUserName(event.target.value);
    }
    const handlerPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation();
        }

        signInUser({userName, password});
        return false
    };
    const validateUserName = (value: string | undefined) => {
        setUserNameValid(getFieldValid(value))
        setUserNameError(generateErrorMessage(value))
    }
    const validatePassword = (value: string | undefined) => {
        setPasswordValid(getFieldValid(value))
        setPasswordError(generateErrorMessage(value))
    }
    const getFieldValid = (value: string | undefined): boolean => {
        return value != null && value.length > 4;
    }
    const generateErrorMessage = (value: string | undefined): string => {
        if (value == null)
            return "You are required to complete this field"
        else
            return "Minimum length 5 characters"
    }

    return (
        <div>
            <Form noValidate onSubmit={handleSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup className={"auth_form"}>
                            <div>
                                <Input
                                    valid={userNameValid}
                                    invalid={userName != null && userNameValid == false}
                                    id="email"
                                    name="email"
                                    placeholder="Username"
                                    type="text"
                                    value={userName}
                                    onChange={handlerUserName}
                                />
                                <FormFeedback style={{textAlign: "right"}}>
                                    {userNameError}
                                </FormFeedback>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup  className={"auth_form"}>
                            <div>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={handlerPassword}
                                    valid={passwordValid}
                                    invalid={password != null && passwordValid == false}
                                />
                                <FormFeedback className={"feedback_wrapper"}>
                                    {passwordError}
                                </FormFeedback>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <div hidden={error == null} className={"sign_in_form auth_error_message"}>
                            {error}
                        </div>
                    </Col>
                </Row>
                <Button disabled={error != null && !passwordValid || !userNameValid} type={"submit"} 
                        color={"success"}>
                    Sign in
                </Button>
            </Form>
        </div>
    );
};

export default SignInForm;
