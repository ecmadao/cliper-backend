import React from 'react';
import ReactDOM from 'react-dom';
import UserComponent from '../components/UserComponent/index';

ReactDOM.render(
  <UserComponent csrf={window.csrf} />,
  document.getElementById('user_component')
);
