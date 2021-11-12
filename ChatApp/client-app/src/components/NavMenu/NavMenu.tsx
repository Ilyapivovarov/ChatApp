import React, {useEffect} from "react";
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useUserSelector} from "../../hooks/useAuth";
import {useActions} from "../../hooks/useActions";

import './NavMenu.css';

interface AuthItemProps {
    isAuthorized: boolean;
}

const AuthItem: React.FC<AuthItemProps> = (prop) => {
    const {singOutUser} = useActions();
    if (!prop.isAuthorized)
        return (
            <>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to={RouteTemplates.SingIn}>
                        Sign in
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to={RouteTemplates.SignOn}>
                        Sign on
                    </NavLink>
                </NavItem>
            </>
        )

    return (
        <NavItem>
            <NavLink className="text-dark" style={{cursor: "pointer"}} onClick={() => singOutUser()}>
                Sing out
            </NavLink>
        </NavItem>
    )
}

const NavMenu: React.FC = () => {
    const {authUser} = useActions();
    const {currentUser, isAuthorized} = useUserSelector(x => x.users);
    useEffect(() => {
        authUser();
    }, [])
    return (
        <div>
            <Navbar className={"box-shadow"} 
                    expand="md"
                    light>
                <Container>
                    <Nav>
                        <NavbarBrand tag={Link} to="/">Chat App</NavbarBrand>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={RouteTemplates.Home}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/chat-room/1">
                                Join to chat room
                            </NavLink>
                        </NavItem>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <AuthItem isAuthorized={isAuthorized}/>
                        </Collapse>
                    </Nav>
                    <NavbarBrand>{currentUser?.userName ?? "Anonymous"}</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;