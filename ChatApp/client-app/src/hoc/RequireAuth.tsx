import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {RouteTemplates} from "../router/types/Routs";
import {useAppSelector} from "../hooks/redux";

interface RequireAuthProps {
    isAuth: boolean
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
    // const {isAuth} = useAppSelector(x => x.authReducer)
    const navigate = useNavigate()
    if (!props.isAuth) {

        navigate("/");
    }

    return (
        <div>
            {props.children}
        </div>
    );
};

export default RequireAuth;
