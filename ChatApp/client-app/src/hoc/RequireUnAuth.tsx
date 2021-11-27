import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const RequireUnAuth: React.FC = ({children}) => {
    const navigate = useNavigate()
    const {isAuth} = useAppSelector(x => x.authReducer)
  
    if (isAuth)
        navigate("/");

    return (
        <div>
            {children}
        </div>
    );
};

export default RequireUnAuth;
