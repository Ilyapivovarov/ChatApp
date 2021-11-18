import React, {useEffect} from 'react';
import SignUpForm from "../../components/AuthForms/SignUpForm";
import {useCustomSelector} from "../../hooks/useStateReader";
import {Redirect} from "react-router-dom";
import {useAuthActions} from "../../hooks/useAuthActions";


const SignOnPage = () => {
    const {isAuthorized} = useCustomSelector(x => x.auth)
    const {resetAuthReducer} = useAuthActions();
    useEffect(() => {
        resetAuthReducer()
    }, [])
    
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
