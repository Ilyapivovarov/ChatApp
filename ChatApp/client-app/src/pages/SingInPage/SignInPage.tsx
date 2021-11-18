import React from 'react';
import {useCustomSelector} from "../../hooks/useStateReader";
import {Redirect} from "react-router-dom";
import SignInForm from "../../components/AuthForms/SignInForm";

import "./SignInPage.css"




const SingInPage: React.FC = () => {
    const {isAuthorized} = useCustomSelector(x => x.auth)
    
    if (isAuthorized)
        return (
            <Redirect to={"/"}/>
        );
    
    return (
        <div>
            <h1>Sign in page</h1>
            <SignInForm/>
        </div>
    );
};

export default SingInPage;