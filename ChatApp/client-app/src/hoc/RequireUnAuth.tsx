import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useCustomSelector} from "../hooks/useCustomSelector";
import {RouteTemplates} from "../router/types/Routs";

const RequireUnAuth: React.FC = ({children}) => {
    const navigate = useNavigate()
    const {isAuthorized} = useCustomSelector(x => x.auth)
  
    if (isAuthorized)
        navigate(-1);

    return (
        <div>
            {children}
        </div>
    );
};

export default RequireUnAuth;
