import React from 'react';
import objectAssign from 'object-assign';
import NProgress from 'nprogress';
require('nprogress/nprogress.css');
import {polyfill} from 'es6-promise';
polyfill();
import Message from '../../../common/message';
const message = new Message();
import LoadingModal from '../../LoadingModal/index';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user_component">
        
      </div>
    )
  }
}

export default User;
