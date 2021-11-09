import React, {useEffect} from "react";
import {Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useUserSelector} from "../../hooks/useAuth";
import {useActions} from "../../hooks/useActions";

import './NavMenu.css';

interface AuthItemProps {
    isAuthorized : boolean;
}

const AuthItem: React.FC<AuthItemProps> = (prop) => {
    const {singOutUser} = useActions();
    if (!prop.isAuthorized)
        return (
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={RouteTemplates.SingIn}>Sign in</NavLink>
            </NavItem>
        )

    return (
        <NavItem>
            <NavLink className="text-dark" style={{cursor: "pointer"}} onClick={() => singOutUser()}>Sing out</NavLink>
        </NavItem>
    )
}

const NavMenu: React.FC = () => {
    const {authUser} = useActions();
    const {account, isAuthorized} = useUserSelector(x => x.users);
    useEffect(() => {
        authUser();
    },[] )
    return (
        <div>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">ChatApp</NavbarBrand>
                    <NavbarBrand>{account?.userName}</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to={RouteTemplates.Home}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/chat-room/1">Join to chat room</NavLink>
                            </NavItem>
                            <AuthItem isAuthorized={isAuthorized}/>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;