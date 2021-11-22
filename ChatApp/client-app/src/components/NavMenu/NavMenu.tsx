import React, {useEffect} from "react";
import {Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import {useActions} from "../../hooks/useActions";

import './NavMenu.css';

interface AuthItemProps {
    isAuthorized: boolean;
}

const AuthItem: React.FC<AuthItemProps> = (prop) => {
    const {signOut} = useActions()
    if (!prop.isAuthorized)
        return (
            <>
                <NavItem>
                    <NavLink tag={Link} to={RouteTemplates.SignOn}>
                        <Button
                            color="primary"
                            outline
                            size="sm"
                        >
                            Sign up
                        </Button>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link}
                             to={RouteTemplates.SingIn}>
                        Sign in
                    </NavLink>
                </NavItem>
            </>
        )

    return (
        <NavItem>
            <NavLink
                onClick={() => signOut()}>
                <Button
                    color="primary"
                    outline
                    size="sm"
                >
                    Sign out
                </Button>
            </NavLink>
        </NavItem>
    )
}

const NavMenu: React.FC = () => {
    console.log("RENDER NAV")
    const {isAuthorized, currentUser} = useCustomSelector(x => x.auth);
    const {authUser} = useActions()
    useEffect(() => {
        authUser()
    }, [currentUser?.id]);
    return (
        <div>
            <Navbar className={"box-shadow"}
                    expand="md"
                    light>
                <Container>
                    <Nav>
                        <NavbarBrand tag={Link} to="/">Chat App</NavbarBrand>
                        <NavItem>
                            <NavLink tag={Link} to={RouteTemplates.Home}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/chat-room/1">
                                Join to chat room
                            </NavLink>
                        </NavItem>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <AuthItem isAuthorized={isAuthorized}/>
                        </Collapse>
                    </Nav>
                    <NavbarBrand>{isAuthorized ? currentUser?.userName : "Anonymous"}</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;