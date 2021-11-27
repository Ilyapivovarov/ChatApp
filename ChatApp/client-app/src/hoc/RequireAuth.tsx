import React from 'react';
import {Navigate} from "react-router-dom";
import {RouteTemplates} from "../router/types/Routs";
import {useAppSelector} from "../hooks/redux";

const RequireAuth: React.FC = ({children}) => {
    const {isAuth} = useAppSelector(x => x.authReducer)
    if (!isAuth) 
        return (<Navigate to={RouteTemplates.SingIn}/>);

    return (
        <div>
            {children}
        </div>
    );
};

export default RequireAuth;
