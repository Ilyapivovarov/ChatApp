import React, {useEffect} from 'react';
import SignInForm from "../../components/AuthForms/SignInForm";
import {useActions} from "../../hooks/useActions";

import "./SignInPage.css"

const SingInPage: React.FC = () => {
    const {resetAuthReducer} = useActions();
    useEffect(() => {
        resetAuthReducer()
    }, [])
    
    return (
        <div>
            <h1>Sign in page</h1>
            <SignInForm/>
        </div>
    );
};

export default SingInPage;