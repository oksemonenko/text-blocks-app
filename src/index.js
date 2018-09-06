import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './styles/index.css';
import App from './containers/App/App';
import createStore from "./store/createStore";
import reducer from './reducers'

const store = createStore(reducer, []);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
