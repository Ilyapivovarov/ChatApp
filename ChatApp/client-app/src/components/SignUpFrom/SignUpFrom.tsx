import React from 'react';
import {Button, Form, FormGroup} from "reactstrap";
import {useUserSelector} from "../../hooks/useAuth";
import InputUserName from "../InputUserName/InputUserName";
import InputPassword from "../InputPassword/InputPassword";
import ConfirmPassword from "../InputPassword/ConfirmPassword";
import {useActions} from "../../hooks/useActions";

import "./SignUpFrom.css"


const SignOnForm: React.FC = () => {
    const state = useUserSelector(x => x.signUp)
    const f = useUserSelector(x => x.users)
    const {signUpUser} = useActions()
    return (
        <div>
            <Form inline>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                    <InputUserName/>
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                    <InputPassword/>
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0 input-from-group">
                    <ConfirmPassword/>
                </FormGroup>
                <Button disabled={!state.isValid}
                        onClick={() => {
                            if (state.password != null && state.confirmPassword == state.password && state.userName != null)
                                signUpUser({
                                    userName: state.userName, password: state.password,
                                    confirmPassword: state.confirmPassword
                                })
                          
                        }}
                        className={"input-from-group"}
                >
                    Sign up
                </Button>
                
            </Form>
        </div>


    );
};

export default SignOnForm;
