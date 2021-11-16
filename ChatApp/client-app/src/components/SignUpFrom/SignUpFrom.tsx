import React from 'react';
import {Alert, Button, Form, FormGroup} from "reactstrap";
import {useSignUp} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import InputUserName from "../InputUserName/InputUserName";
import InputPassword from "../InputPassword/InputPassword";
import ConfirmPassword from "../InputPassword/ConfirmPassword";

import "./SignUpFrom.css"
import {useActions} from "../../hooks/useActions";

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
                                return signUpUser({
                                    userName: state.userName, password: state.password,
                                    confirmPassword: state.confirmPassword
                                })
                        }}
                        className={"input-from-group"}
                >
                    Sign on
                </Button>
                <h1>
                    {f.error}
                </h1>
            </Form>
        </div>


    );
};

export default SignOnForm;
