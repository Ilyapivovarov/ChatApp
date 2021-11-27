import React, {useEffect} from 'react';
import SignInForm from "../../components/AuthForms/SignInForm";

import "./SignInPage.css"
import {useAppDispatch} from "../../hooks/redux";

const SingInPage: React.FC = () => {
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch()
    // }, [])
    //
    return (
        <div className={"page"}>
            <h1>Sign in page</h1>
            <SignInForm/>
        </div>
    );
};

export default SingInPage;