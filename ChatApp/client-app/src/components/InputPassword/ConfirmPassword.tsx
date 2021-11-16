import React from "react";
import {useSignUp} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import {FormFeedback, Input} from "reactstrap";

const generateErrorMessage = (password: string | null, confirmPassword : string | null): string => {
    if (confirmPassword == null)
        return "Input required field"

    if (confirmPassword != password)
        return "Not same"

    return "Username min length 5 symbols"
}

const ConfirmPassword: React.FC = () => {
    const {enterConfirmPassword} = useSignUp();
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
                {generateErrorMessage(password, confirmPassword)}
            </FormFeedback>
        </>
    );
}

export default ConfirmPassword