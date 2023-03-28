// core
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './firebase';
// components
import {App} from './App';
// other
import {store} from './init';
// styles
import './index.css';
import '@vkontakte/vkui/dist/vkui.css';
import {AppRoot, ConfigProvider} from "@vkontakte/vkui";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <ConfigProvider>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoot>
                    <App/>
                </AppRoot>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>
);
