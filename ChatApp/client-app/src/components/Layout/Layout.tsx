import * as React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

import "./Layout.css"

const Layout: React.FC = () => {
    console.log("layout render")
    return (
        <>
            <NavMenu/>
            <Container className={"content-container"}>
                <Outlet/>
            </Container>
        </>
    );
}

export default Layout;