import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {RouteTemplates} from "../router/types/Routs";
import {useAppSelector} from "../hooks/redux";

interface RequireAuthProps {
    isAuth: boolean
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
    // const {isAuth} = useAppSelector(x => x.authReducer)

    if (!props.isAuth) {
        const navigate = useNavigate()
        navigate("/");
    }
    
    return (
        <div>
            {props.children}
        </div>
    );
};

export default RequireAuth;
