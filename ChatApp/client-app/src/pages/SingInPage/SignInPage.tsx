import React from 'react';


import "./SignInPage.css"
import SignInForm from "../../components/SignInForm/SignInForm";

const SingInPage: React.FC = () => {
    return (
        <div>
            <h1>Sign in page</h1>
            <SignInForm/>
        </div>
    );
};

export default SingInPage;