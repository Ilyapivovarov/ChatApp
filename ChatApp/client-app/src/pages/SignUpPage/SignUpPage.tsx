import React from 'react';
import SignUpForm from "../../components/AuthForms/SignUpForm";
import {useCustomSelector} from "../../hooks/useStateReader";
import {Redirect} from "react-router-dom";


const SignOnPage = () => {
    const {isAuthorized} = useCustomSelector(x => x.auth)

    if (isAuthorized)
        return (
            <Redirect to={"/"}/>
        );
    
    return (
        <div>
            <h1>Sign up</h1>
            <SignUpForm/>
        </div>
    );
};

export default SignOnPage;
