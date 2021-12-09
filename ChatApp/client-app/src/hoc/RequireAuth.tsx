import React from 'react';
import {Navigate} from "react-router-dom";
import {RouteTemplates} from "../router/types/Routs";
import {useAppSelector} from "../hooks/redux";

interface RequireAuthProps {
    isAuth: boolean
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
    // const {isAuth} = useAppSelector(x => x.authReducer)
    

    return (
        <div>
            {props.children}
        </div>
    );
};

export default RequireAuth;
