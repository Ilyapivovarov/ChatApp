import React from 'react';
import {useNavigate} from "react-router-dom";

interface RequireAuthProps {
    isAuth: boolean
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
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
