import React, {useState} from 'react';
import {Button, Form, Input} from "reactstrap";
import {useActions} from "../../hooks/useActions";
import {useUserSelector} from "../../hooks/useAuth";
import {Redirect} from "react-router-dom";

import "./SignInPage.css"

const SingInPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {signInUser} = useActions()
    const {error, isAuthorized} = useUserSelector(state => state.users);
    if (isAuthorized)
        return (
            <Redirect to={"/"}/>
        )

    return (
        <>
            <h1>Sign in page</h1>
            <div className={"sign-in-wrapper"}>
                <Form className={"sign-in-form"}>
                    <Input
                        className={"name-input"}
                        placeholder={"Username"}
                        value={username}
                        onChange={(e) => {
                            e.persist();
                            setUsername(x => e.target.value)
                        }}
                    />

                    <Input
                        className={"name-input"}
                        value={password}
                        type={"password"}
                        placeholder={"Password"}
                        onChange={(e) => {
                            e.persist();
                            setPassword(x => e.target.value)
                        }}
                    />
                    
                    <div>
                        <h2>{error}</h2>
                    </div>

                    <div>
                        <Button onClick={() => signInUser({username: username, password: password})}> Sign in </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default SingInPage;