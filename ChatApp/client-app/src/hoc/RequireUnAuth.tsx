import React from 'react';

interface RequireUnAuthProps {
    isAuth: boolean
}

const RequireUnAuth: React.FC<RequireUnAuthProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default RequireUnAuth;
