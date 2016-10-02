import React from 'react';
import objectAssign from 'object-assign';
import NProgress from 'nprogress';
require('nprogress/nprogress.css');
import {polyfill} from 'es6-promise';
polyfill();
import Message from '../../../common/message';
const message = new Message();
import {
  STEP_ONE,
  STEP_TWO,
  LOGIN_STEP,
  REGISTER_STEP,
  getDefaultState
} from '../ConstValue';
import {
  validateEqual
} from '../../../utils/validator';
import LoginForm from './LoginForm';
import LoadingModal from '../../LoadingModal/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const {csrf} = props;
    this.state = {...getDefaultState(), csrf};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkEmailExist = this.checkEmailExist.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    this.toggleLoading(false);
  }

  toggleLoading(status) {
    this.setState({
      loading: status
    });
  }

  checkEmailExist(step) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      NProgress.set(0.4);
      const {csrf, loginInfo} = this.state;
      const {email} = loginInfo;
      $.ajax({
        url: '/user/check_email',
        method: 'POST',
        data: {
          email,
          '_csrf': csrf
        },
        success: (data) => {
          let stepTwo = REGISTER_STEP;
          if (data.success) {
            stepTwo = LOGIN_STEP;
          }
          this.setState({
            steps: [STEP_ONE, stepTwo]
          });
          NProgress.done();
          message.notice(data.message);
          resolve(data);
        },
        error: (err) => {
          NProgress.done();
          reject(false);
        }
      });
    });
  }

  handleSubmit() {
    if (!this.validateCanSubmit()) {
      return;
    }
    this.toggleLoading(true);
    const {csrf, loginInfo, submitType} = this.state;
    const {email, password} = loginInfo;
    const url = submitType === 'login' ? '/user/login' : '/user/signup';
    $.ajax({
      url,
      method: 'post',
      data: {
        '_csrf': csrf,
        email,
        password
      },
      success: (data) => {
        this.toggleLoading(false);
        if (data.success) {
          window.location.href = data.url;
        } else {
          message.error('擦出错了');
        }
      },
      error: (err) => {
        this.toggleLoading(false);
        message.error('擦出错了');
      }
    });
  }

  handleFormChange(newLoginInfo) {
    const {loginInfo} = this.state;
    this.setState({
      loginInfo: objectAssign({}, loginInfo, newLoginInfo)
    });
  }

  validateCanSubmit() {
    const {loginInfo, submitType} = this.state;
    const {password, repeatPassword} = loginInfo;
    if (submitType === 'register' && !validateEqual(password, repeatPassword)) {
      message.error('两次输入不相等');
      return false;
    }
    return true;
  }

  handleStepChange(step) {
    this.setState({ step });
  }

  render() {
    const {step, steps, loginInfo, loading} = this.state;
    return (
      <div className="login_wrapper">
        <LoadingModal showModal={loading} />
        <LoginForm
          step={step}
          inputs={steps[step]}
          loginInfo={loginInfo}
          hasPreStep={step > 0}
          hasNextStep={step < steps.length - 1}
          handleSubmit={this.handleSubmit}
          handleFormChange={this.handleFormChange}
          handleStepChange={this.handleStepChange}
          checkEmailExist={this.checkEmailExist}
        />
      </div>
    )
  }
}

export default Login;
