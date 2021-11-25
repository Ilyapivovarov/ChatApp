import React, {useEffect} from 'react';
import SignUpForm from "../../components/AuthForms/SignUpForm";
import {useActions} from "../../hooks/useActions";

import "./SignUpPage.css"

const SignOnPage = () => {
    const {resetAuthReducer} = useActions();
    useEffect(() => {
        resetAuthReducer()
    }, [])
    
    return (
        <div className={"page"}>
            <h1>Sign up</h1>
            <SignUpForm/>
        </div>
    );
};

export default SignOnPage;
