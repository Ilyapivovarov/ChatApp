import React, {useEffect} from 'react';
import SignUpForm from "../../components/AuthForms/SignUpForm";
import {useActions} from "../../hooks/useActions";


const SignOnPage = () => {
    const {resetAuthReducer} = useActions();
    useEffect(() => {
        resetAuthReducer()
    }, [])
    
    return (
        <div>
            <h1>Sign up</h1>
            <SignUpForm/>
        </div>
    );
};

export default SignOnPage;
