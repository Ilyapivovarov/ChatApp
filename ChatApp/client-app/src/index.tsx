import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {setupStore} from "./store";
import {Provider} from 'react-redux';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = setupStore();

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);