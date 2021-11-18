import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuthActions} from "../../hooks/useAuthActions";
import {useCustomSelector} from "../../hooks/useStateReader";
import {Button, Col, Form, FormFeedback, FormGroup, Input, Row} from "reactstrap";

const SignOnForm: React.FC = () => {
    const {signUpUser} = useAuthActions()
    const {error} = useCustomSelector(x => x.auth)

    const [userName, setUserName] = useState<string>("");
    const [userNameValid, setUserNameValid] = useState<boolean>();
    const [userNameError, setUserNameError] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordValid, setPasswordValid] = useState<boolean>();
    const [passwordError, setPasswordError] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
        validateUserName(event.target.value);
    }
    const handlerPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    }
    const handlerConfirmPassword = (event : ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
        validateConfirmPassword(event.target.value)
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation();
        }

        signUpUser({userName, password, confirmPassword});
        return false
    };
    
    const validateUserName = (value: string | undefined) => {
        setUserNameValid(getFieldValid(value))
        setUserNameError(generateErrorMessage(value))
    }
    const validatePassword = (value: string | undefined) => {
        setPasswordValid(getFieldValid(value))
        setPasswordError(generateErrorMessage(value))
        setConfirmPasswordValid(value != null && value == confirmPassword)
    }
    const validateConfirmPassword = (value: string | undefined) => {
        setConfirmPasswordValid(validateConfirmPasswordField(value))
        setConfirmPasswordError(generateErrorMessage(value))
    }
    
    const validateConfirmPasswordField = (value: string | undefined) => {
        return password != null && password.length != 0 && value == password;
    }
    
    const getFieldValid = (value: string | undefined): boolean => {
        return value != null && value.length > 4;
    }
    const generateErrorMessage = (value: string | undefined): string => {
        if (value == null)
            return "You are required to complete this field"
        else if (value.length < 5)
            return "Minimum length 5 characters"
        else return "Passwords not same"
    }

    return (
        <div>
            <Form noValidate onSubmit={handleSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup className={"sign_in_form"}>
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
                        <FormGroup  className={"sign_in_form"}>
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
                        <FormGroup  className={"sign_in_form"}>
                            <div>
                                <Input
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Confirm password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handlerConfirmPassword}
                                    valid={confirmPasswordValid}
                                    invalid={confirmPassword != null && confirmPasswordValid == false}
                                />
                                <FormFeedback className={"feedback_wrapper"}>
                                    {confirmPasswordError}
                                </FormFeedback>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <div hidden={error == null} className={"sign_in_form sign_in_error_message"}>
                            {error}
                        </div>
                    </Col>
                </Row>
                <Button disabled={error != null && !passwordValid || !userNameValid} type={"submit"}
                        color={"success"}>
                    Sign up
                </Button>
            </Form>
        </div>
    );
};

export default SignOnForm;
