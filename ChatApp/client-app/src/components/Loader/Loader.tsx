import React from 'react';
import {Spinner} from "reactstrap";

import "./Loader.css"

const MyComponent = () => {
    return (
        <div className={"preloader"}>
            <div className={"preloader__row"}>
                <Spinner className={"preloader__item"}>
                    Loading...
                </Spinner>
            </div>
        </div>
    );
};

export default MyComponent;
