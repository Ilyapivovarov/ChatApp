import * as React from 'react';
import {Container} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import {useEffect} from "react";
import {authUser} from "../../store/action-creators/user";

import "./Layout.css"

const Layout: React.FC = (props) => {
    useEffect(() => {
        console.log("work")
        authUser()
    }, [props]);

    return (
        <>
            <NavMenu/>
            <Container className={"content-container"}>
                {props.children}
            </Container>
        </>
    );
}

export default Layout;