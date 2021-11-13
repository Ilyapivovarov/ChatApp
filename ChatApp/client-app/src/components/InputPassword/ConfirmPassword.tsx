import React from "react";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import {FormFeedback, Input} from "reactstrap";

const ConfirmPassword: React.FC = () => {
    const {enterConfirmPassword} = useSignOn();
    const {confirmPassword, password} = useUserSelector(x => x.signOn);

    if (confirmPassword != null && confirmPassword.length > 4
        && confirmPassword == password) {
        return (
            <>
                <Input type={"password"}
                       placeholder={"Confirm password"}
                       valid
                       value={confirmPassword}
                       onChange={(event => {
                           event.persist();
                           enterConfirmPassword(event.target.value);
                       })}/>
            </>
        );
    }
    return (
        <>
            <Input type={"password"}
                   placeholder={"Confirm password"}
                   invalid={confirmPassword != null || password != null}
                   value={confirmPassword ?? ""}
                   onChange={(event => {
                       event.persist();
                       enterConfirmPassword(event.target.value);
                   })}/>
            <FormFeedback hidden={confirmPassword == null && password == null}>
                Error confirm password
            </FormFeedback>
        </>
    );
}

export default ConfirmPassword