import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// Secure Auth3 Authentication provider
import { SecureAuth3Provider } from 'web3-cloud';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <SecureAuth3Provider apiKey="xxxxxxxxxxxxxxx" appId="xxxxxxxxxxx">
            <App />
          </SecureAuth3Provider> 
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
