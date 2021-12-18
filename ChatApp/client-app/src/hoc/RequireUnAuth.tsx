import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";

interface RequireUnAuthProps {
    isAuth: boolean
}

const RequireUnAuth: React.FC<RequireUnAuthProps> = (props) => {
    const navigate = useNavigate();
    if (props.isAuth)
        navigate('/')
        
    return (
        <div>
            {props.children}
        </div>
    );
};

export default RequireUnAuth;
