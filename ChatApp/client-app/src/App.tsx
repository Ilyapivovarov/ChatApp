import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ChatRoomPage from "./pages/ChatRoomPage/ChatRoomPage";
import SignInPage from "./pages/SingInPage/SignInPage";
import {Routs} from "./router/types/Routs";


import './App.css';

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path={Routs.Home} component={HomePage}/>
                <Route path={Routs.ChatRoom} component={ChatRoomPage}/>
                <Route path={Routs.SingIn} component={SignInPage} />
            </Switch>
        </Layout>
    )
}

export default App;
