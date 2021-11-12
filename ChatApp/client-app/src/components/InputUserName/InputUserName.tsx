import React from "react";
import {useSignOn} from "../../hooks/useSignOn";
import {useUserSelector} from "../../hooks/useAuth";
import {FormFeedback, Input} from "reactstrap";

const generateErrorMessage = (userName: string | null): string => {
    if (userName == null)
        return "Input required field"

    return "Username min length 5 symbols"
}

const InputUserName: React.FC = () => {
    const {enterUsername} = useSignOn();
    const {userName} = useUserSelector(x => x.signOn);
    if (userName != null && userName.length > 5) {
        return (
            <>
                <Input valid value={userName} onChange={(event => {
                    event.persist();
                    enterUsername(event.target.value);
                })}/>
            </>
        );
    }
    return (
        <>
            <Input required={true} invalid={userName != null}
                   value={userName ?? ""}
                   onChange={(event => {
                       event.persist();
                       enterUsername(event.target.value);
                   })}/>
            <FormFeedback hidden={userName == null}>
                {generateErrorMessage(userName)}
            </FormFeedback>
        </>
    );
}

export default InputUserName