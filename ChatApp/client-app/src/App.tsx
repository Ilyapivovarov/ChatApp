import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ChatRoomPage from "./pages/ChatRoomPage/ChatRoomPage";
import SignInPage from "./pages/SingInPage/SignInPage";
import {RouteTemplates} from "./router/types/Routs";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import RequireAuth from "./hoc/RequireAuth";
import RequireUnAuth from "./hoc/RequireUnAuth";
import AccountPage from "./pages/AccountPage/AccountPage";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {validateToken} from "./store/reducers/AuthReducer/AuthActionCreators";

import './App.css';

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(validateToken())
    }, []);
    const {isAuth} = useAppSelector(x => x.authReducer)

    return (
        <Routes>
            <Route path={RouteTemplates.Home} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={RouteTemplates.ChatRoom} element={<RequireAuth isAuth={isAuth} children={<ChatRoomPage/>}/>}/>
                <Route path={RouteTemplates.SingIn} element={<RequireUnAuth isAuth={isAuth} children={<SignInPage/>}/>}/>
                <Route path={RouteTemplates.SignOn} element={<RequireUnAuth isAuth={isAuth} children={<SignUpPage/>}/>}/>
                <Route path={RouteTemplates.ProfilePage} element={<RequireAuth isAuth={isAuth} children={<AccountPage/>}/>}/>
            </Route>
        </Routes>

    )
}

export default App;