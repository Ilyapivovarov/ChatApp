import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SingInPage/SignInPage";
import {RouteTemplates} from "./router/types/Routs";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import RequireAuth from "./hoc/RequireAuth";
import RequireUnAuth from "./hoc/RequireUnAuth";
import UserPage from "./pages/UserPage/UserPage";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {validateToken} from "./store/reducers/AuthReducer/AuthActionCreators";
import ChatListPage from "./pages/ChatListPage/ChatsPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import UserListPage from "./pages/UserListPage/UserListPage";

import './App.css';



const App: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(validateToken())
    }, [dispatch]);
    const {isAuth} = useAppSelector(x => x.authReducer)

    return (
        <Routes>
            <Route path={RouteTemplates.Home} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={RouteTemplates.SingIn} element={<RequireUnAuth isAuth={isAuth} children={<SignInPage/>}/>}/>
                <Route path={RouteTemplates.SignOn} element={<RequireUnAuth isAuth={isAuth} children={<SignUpPage/>}/>}/>
                <Route path={RouteTemplates.UserPage} element={<RequireAuth isAuth={isAuth} children={<UserPage/>}/>}/>
                <Route path={RouteTemplates.Chats} element={<RequireAuth isAuth={isAuth} children={<ChatListPage/>}/>}/>
                <Route path={RouteTemplates.Chat} element={<RequireAuth isAuth={isAuth} children={<ChatPage/>}/>}/>
                <Route path={RouteTemplates.UserList} element={<RequireAuth isAuth={isAuth} children={<UserListPage/>}/>}/>
            </Route>
        </Routes>

    )
}

export default App;