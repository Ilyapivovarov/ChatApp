import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Col, Form, FormFeedback, FormGroup, Input, Row} from 'reactstrap';
import {SignIn} from "../../types/dataTypes";
import {useAuthActions} from "../../hooks/useAuthActions";

const SignInForm: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [userNameValid, setUserNameValid] = useState<boolean>();
    const [userNameError, setUserNameError] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordValid, setPasswordValid] = useState<boolean>();
    const [passwordError, setPasswordError] = useState<string>("");
    
    const {signInUser} = useAuthActions()

    const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
        validateUserName(event.target.value);
    }

    const handlerPassword = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("input password")
        console.log(event.target.value, event.target.value.length)
        setPassword(event.target.value);
        validatePassword(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        signInUser({userName, password});
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
                        <FormGroup>
                            <div style={{minHeight: "63px", justifyItems: "center"}}>
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
                        <FormGroup>
                            <div style={{minHeight: "63px"}}>
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
                                <FormFeedback style={{textAlign: "right"}}>
                                    {passwordError}
                                </FormFeedback>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Button disabled={!passwordValid || !userNameValid} type={"submit"}>
                    Sign in
                </Button>
            </Form>
        </div>
    );
};

export default SignInForm;
