import React, {useEffect} from "react";
import {Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {RouteTemplates} from "../../router/types/Routs";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {signOut, validateToken} from "../../store/reducers/AuthReducer/AuthActionCreators";

import './NavMenu.css';


interface AuthItemProps {
    isAuthorized: boolean;
}

const AuthItem: React.FC<AuthItemProps> = (prop) => {
    const {isAuth, currentUser} = useAppSelector(x => x.authReducer);
    const dispatch = useAppDispatch();
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
        <>
            <NavItem>
                <NavLink
                    onClick={() => dispatch(signOut())}>
                    <Button
                        color="primary"
                        outline
                        size="sm"
                    >
                        Sign out
                    </Button>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link}
                         to={"/profile/" + currentUser?.id}>{isAuth ? currentUser?.userName.toUpperCase() : ""}</NavLink>
            </NavItem>
        </>
    )
}

const NavMenu: React.FC = () => {
    const {isAuth, currentUser} = useAppSelector(x => x.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(validateToken())
    }, [currentUser?.id]);
    return (
        <div>
            <Navbar className={"box-shadow"}
                    expand="md"
                    light>
                <Container>
                    <Nav pills>
                        <NavbarBrand tag={Link} to="/">Chat App</NavbarBrand>
                        <NavItem>
                            <NavLink tag={Link} to={RouteTemplates.Chats}>
                                Chats
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to={RouteTemplates.ChatRooms}>
                                Chat rooms
                            </NavLink>
                        </NavItem>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <AuthItem isAuthorized={isAuth}/>
                        </Collapse>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;