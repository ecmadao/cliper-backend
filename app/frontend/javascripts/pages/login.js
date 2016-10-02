import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from '../components/LoginComponent/index';

// const renderLogin = (state, domId) => {
//   ReactDOM.render(
//       <LoginComponent {...state} />,
//       document.getElementById(domId)
//   );
// };
//
// export default renderLogin

ReactDOM.render(
  <LoginComponent csrf={window.csrf} />,
  document.getElementById('login_component')
);
