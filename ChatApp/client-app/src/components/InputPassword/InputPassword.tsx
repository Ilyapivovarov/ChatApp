import React from "react";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import {FormFeedback, Input} from "reactstrap";

const InputPassword: React.FC = () => {
    const {enterPassword} = useSignOn();
    const {password} = useUserSelector(x => x.signOn);
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
                Error password
            </FormFeedback>
        </>
    );
}

export default InputPassword;