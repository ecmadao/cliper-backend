import React from 'react';
import objectAssign from 'object-assign';
import {
  STEP_ONE,
  STEP_TWO,
  LOGIN_STEP,
  REGISTER_STEP,
  getDefaultState
} from '../ConstValue';
import LoginForm from './LoginForm';
import LoginStep from './LoginStep';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const {csrf} = props;
    this.state = {...getDefaultState(), csrf};
    this.checkEmail = this.checkEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  checkEmail(step) {
    this.setState({ step });
  }

  handleSubmit() {

  }

  handleFormChange(newLoginInfo) {
    const {loginInfo} = this.state;
    this.setState({
      loginInfo: objectAssign({}, loginInfo, newLoginInfo)
    });
  }

  handleStepChange(step) {
    const {steps} = this.state;
    if (step > steps.length - 1) {
      this.handleSubmit();
      return;
    }
    if (step === 1) {
      this.checkEmail(step);
      return;
    }
    this.setState({ step });
  }

  render() {
    const {step, steps, loginInfo} = this.state;
    return (
      <div className="login_wrapper">
        <LoginForm
          inputs={steps[step]}
          loginInfo={loginInfo}
          handleFormChange={this.handleFormChange}
          handleStepChange={() => {
            this.handleStepChange(step + 1)
          }}
        />
        <LoginStep
          step={step}
          hasPreStep={step > 0}
          hasNextStep={step < steps.length - 1}
          handleSubmit={this.handleSubmit}
          handleStepChange={this.handleStepChange}
        />
      </div>
    )
  }
}

export default Login;
