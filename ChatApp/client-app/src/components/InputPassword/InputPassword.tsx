import React from "react";
import {useSignUp} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import {FormFeedback, Input} from "reactstrap";

const generateErrorMessage = (password: string | null): string => {
    if (password == null)
        return "Input required field"

    return "Password min length 5 symbols"
}

const InputPassword: React.FC = () => {
    const {enterPassword} = useSignUp();
    const {password} = useUserSelector(x => x.signUp);
    if (password != null && password.length > 4) {
        return (
            <>
                <Input type={"password"}
                       placeholder={"Password"}
                       required={true}
                       valid
                       value={password}
                       onChange={(event => {
                           event.persist();
                           enterPassword(event.target.value);
                       })}/>
            </>
        );
    }
    return (
        <>
            <Input type={"password"}
                   placeholder={"Password"}
                   required={true}
                   invalid={password != null}
                   value={password ?? ""}
                   onChange={(event => {
                       event.persist();
                       enterPassword(event.target.value);
                   })}/>
            <FormFeedback hidden={password == null}>
                {generateErrorMessage(password)}
            </FormFeedback>
        </>
    );
}

export default InputPassword;