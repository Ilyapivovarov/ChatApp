import React from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useUserSelector} from "../../hooks/useAuth";
import {useActions} from "../../hooks/useActions";

import './NavMenu.css';

const AuthItem: React.FC = () => {
    const {isAuthorized, userName} = useUserSelector(state => state.users)
    const {singOutUser} = useActions();
    
    if (!isAuthorized)
        return (
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={RouteTemplates.SingIn}>Sign in</NavLink>
            </NavItem>
        )

    return (
        <>
            <NavItem>
                <div>{userName}</div>
            </NavItem>
            <NavItem>
                <NavLink className="text-dark" onClick={() => singOutUser()} >Sing out</NavLink>
            </NavItem>
        </>
    )
}

const NavMenu: React.FC = () => {
    return (
        <div>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">ChatApp</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to={RouteTemplates.Home}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/chat-room/1">Join to chat room</NavLink>
                            </NavItem>
                            <AuthItem/>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;