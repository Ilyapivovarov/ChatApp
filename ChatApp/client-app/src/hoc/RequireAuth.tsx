import React from 'react';
import {Navigate} from "react-router-dom";
import {useCustomSelector} from "../hooks/useCustomSelector";

import {RouteTemplates} from "../router/types/Routs";

const RequireAuth: React.FC = ({children}) => {
    const {isAuthorized} = useCustomSelector(x => x.auth)

    if (!isAuthorized)
        return (<Navigate to={RouteTemplates.SingIn}/>);

    return (
        <div>
            {children}
        </div>
    );
};

export default RequireAuth;
