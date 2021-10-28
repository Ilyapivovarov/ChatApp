import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ChatRoomPage from "./pages/ChatRoomPage/ChatRoomPage";
import SignInPage from "./pages/SingInPage/SignInPage";

import './App.css';

const App : React.FC = () => {
  return (
      <Layout>
       <Switch>
                <Route exact path="/" component={HomePage} />
           <Route exact path="/" component={ChatRoomPage} />
           <Route exact path="/" component={SignInPage} />
       </Switch>
      </Layout>
  )
}

export default App;
