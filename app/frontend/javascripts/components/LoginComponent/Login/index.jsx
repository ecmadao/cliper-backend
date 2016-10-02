import React from 'react';
import objectAssign from 'object-assign';
import {polyfill} from 'es6-promise';
polyfill();
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

  checkEmailExist(step) {
    return new Promise((resolve, reject) => {
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
          resolve(data);
        },
        error: (err) => {
          reject(false);
        }
      });
    });
  }

  handleSubmit() {
    if (!this.validateCanSubmit()) {
      return;
    }
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
      alert('两次输入不相等');
      return false;
    }
    return true;
  }

  handleStepChange(step) {
    this.setState({ step });
  }

  render() {
    const {step, steps, loginInfo} = this.state;
    return (
      <div className="login_wrapper">
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
