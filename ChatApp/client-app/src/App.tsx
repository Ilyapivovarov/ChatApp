import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ChatRoomPage from "./pages/ChatRoomPage/ChatRoomPage";
import SignInPage from "./pages/SingInPage/SignInPage";
import {RouteTemplates} from "./router/types/Routs";

import './App.css';
import SignOnPage from "./pages/SignOnPage/SignOnPage";

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path={RouteTemplates.Home} component={HomePage} />
                <Route path={RouteTemplates.ChatRoom} component={ChatRoomPage}/>
                <Route path={RouteTemplates.SingIn} component={SignInPage}/>
                <Route path={RouteTemplates.SignOn} component={SignOnPage}/>
            </Switch>
        </Layout>
    )
}

export default App;
