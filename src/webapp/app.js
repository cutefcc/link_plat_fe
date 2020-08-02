import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/index';
import store from './store/index';

const rootElement = document.getElementById("app");
ReactDom.render(<Provider store={store}><App /></Provider>, rootElement);