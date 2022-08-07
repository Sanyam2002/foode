import React from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery'
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import reducer from './components/reducers/user_reducer'
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(
    reducer
  )}>
    <App />
  </Provider>,
  document.getElementById('root')
);

