import React from 'react';
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
import {useAppDispatch} from "./hooks/redux";
import {validateToken} from "./store/reducers/AuthReducer/AuthActionCreators";

import './App.css';

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    dispatch(validateToken())

    return (
        <Routes>
            <Route path={RouteTemplates.Home} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={RouteTemplates.ChatRoom} element={<RequireAuth children={<ChatRoomPage/>}/>}/>
                <Route path={RouteTemplates.SingIn} element={<RequireUnAuth children={<SignInPage/>}/>}/>
                <Route path={RouteTemplates.SignOn} element={<RequireUnAuth children={<SignUpPage/>}/>}/>
                <Route path={RouteTemplates.ProfilePage} element={<RequireAuth children={<AccountPage/>}/>}/>
            </Route>
        </Routes>

    )
}

export default App;