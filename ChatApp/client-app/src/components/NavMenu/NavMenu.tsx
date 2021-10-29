import {FC, useEffect, useState} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useUserSelector} from "../../hooks/useAuth";

import './NavMenu.css';
import {useDispatch} from "react-redux";
import {signInUser} from "../../store/action-creators/user";

const NavMenu: FC = () => {
    
    const [flag, setFlag] = useState<boolean>();
    const {isAuthorized, userName} = useUserSelector(state => state.users)
    
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">ChatApp</NavbarBrand>
                    <NavbarToggler onClick={() => {
                        setFlag((f) => !f)
                    }} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={flag} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to={RouteTemplates.Home}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/chat-room/1">Join to chat room</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to={RouteTemplates.SingIn}>Sign in</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;