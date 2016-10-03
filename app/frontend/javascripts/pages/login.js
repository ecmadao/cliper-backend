import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from '../components/LoginComponent/index';

ReactDOM.render(
  <LoginComponent csrf={window.csrf} />,
  document.getElementById('login_component')
);
