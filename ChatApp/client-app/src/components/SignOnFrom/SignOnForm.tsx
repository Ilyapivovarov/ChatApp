import React from 'react';
import {Alert, Button, Form, FormGroup} from "reactstrap";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import InputUserName from "../InputUserName/InputUserName";
import InputPassword from "../InputPassword/InputPassword";
import ConfirmPassword from "../InputPassword/ConfirmPassword";

import "./SignOnFrom.css"

const SignOnForm: React.FC = () => {
    const {submitForm} = useSignOn()
    const state = useUserSelector(x => x.signOn)
    return (
        <div id={"asd"}>
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
                        onClick={() => submitForm(state)}
                        className={"input-from-group"}
                >
                    Sign on
                </Button>
            </Form>
        </div>
        

    );
};

export default SignOnForm;
