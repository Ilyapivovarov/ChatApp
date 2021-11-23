import React from 'react';
import {useNavigate} from "react-router-dom";
import {useCustomSelector} from "../hooks/useCustomSelector";

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
