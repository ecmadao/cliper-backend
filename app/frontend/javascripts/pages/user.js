import React from 'react';
import ReactDOM from 'react-dom';
import renderCliper from '../components/UserComponent/index';
import EmptyComponent from '../components/EmptyComponent/index';

if (window.hasClipers) {
  const state = {
    csrf: window.csrf
  };
  renderCliper(state, 'user_component');
} else {
  ReactDOM.render(
      <EmptyComponent />,
      document.getElementById('user_component')
  );
}
