import React, {useState} from 'react';
import {Button, Form, Input} from "reactstrap";
import {useActions} from "../../hooks/useActions";
import {useUserSelector} from "../../hooks/useAuth";
import {Redirect} from "react-router-dom";

import "./SignInPage.css"

const SingInPage: React.FC = () => {
    const [username, setUsername] = useState("");
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
                <h2>Enter username</h2>
                <Form className={"sign-in-form"}>
                    <Input
                        className={"name-input"}
                        value={username}
                        onChange={(e) => {
                            e.persist();
                            setUsername((username) => e.target.value)
                        }}
                    />

                    <div>
                        <h2>{error}</h2>
                    </div>

                    <div>
                        <Button onClick={() => signInUser(username)}> Sign in </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default SingInPage;