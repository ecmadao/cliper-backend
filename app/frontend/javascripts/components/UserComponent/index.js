import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {cliperApp} from './redux/reducer/index';
import User from './User/index';

const renderCliper = (state, domId) => {
  const store = createStore(
      cliperApp,
      state,
      applyMiddleware(thunkMiddleware)
  );
  ReactDOM.render(
      <Provider store={store}>
        <User />
      </Provider>,
      document.getElementById(domId)
  );
};

export default renderCliper;
