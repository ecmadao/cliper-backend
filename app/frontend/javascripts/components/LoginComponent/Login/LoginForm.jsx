import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../../../common/message';
const message = new Message();

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreStep = this.handlePreStep.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {
    this.componentAnimation();
    $($('.login_input')[0]).focus();
  }

  componentAnimation () {
    let $introContainer = $('.loginform_container');
    $introContainer.removeClass('animation');
    setTimeout(() => {
      $introContainer.addClass('animation');
    }, 500);
  }

  validateInput(ref) {
    const {inputs} = this.props;
    const filteredInput = inputs.filter(input => input.ref === ref);
    if (filteredInput && filteredInput.length) {
      const value = this.refs[ref].value;
      const result = filteredInput[0].validator(value);
      if (!result.result) {
        const inputDOM = ReactDOM.findDOMNode(this.refs[ref]);
        this.inputAnimation(inputDOM);
        message.error(result.message);
      }
      return result.result;
    }
    message.error('找不到指定对象');
    return false;
  }

  inputAnimation(target) {
    $(target).addClass('animation');
    setTimeout(() => {
      $(target).removeClass('animation');
    }, 500);
  }

  validateCanStepChange() {
    const {inputs, loginInfo} = this.props;
    const validateResults = inputs.map((loginInput) => {
      const {ref, validator} = loginInput;
      const value = loginInfo[ref];
      const result = validator(value);
      if (!result.result) {
        message.error(result.message);
      }
      return result;
    });
    return validateResults.every(validateResult => validateResult.result);
  }

  handleInputChange(ref) {
    const value = this.refs[ref].value;
    const {handleFormChange} = this.props;
    let newInfo = {};
    newInfo[ref] = value;
    handleFormChange && handleFormChange(newInfo);
  }

  handleBlur(inputRef) {
    if (inputRef === 'email' && this.validateInput(inputRef)) {
      const {checkEmailExist} = this.props;
      checkEmailExist && checkEmailExist();
    }
  }

  handleStepChange(step) {
    const {handleStepChange} = this.props;
    this.componentAnimation();
    setTimeout(() => {
      handleStepChange && handleStepChange(step);
    }, 400);
  }

  handleNextStep() {
    const result = this.validateCanStepChange();
    if (result) {
      const {step} = this.props;
      this.handleStepChange(step + 1);
    }
  }

  handlePreStep() {
    const {step} = this.props;
    this.handleStepChange(step - 1);
  }

  handleKeyDown(e, inputRef) {
    if (e.which === 13) {
      const validateResult = this.validateInput(inputRef);
      if (!validateResult) {
        return false;
      }
      let $nextForm = $(e.target).next('.login_input');
      if ($nextForm && $nextForm.length) {
        $nextForm.focus();
        return;
      }
      const {
        step,
        hasNextStep,
        handleSubmit,
        checkEmailExist,
        handleStepChange
      } = this.props;
      if (!hasNextStep) {
        if (!this.validateCanStepChange()) {
          return;
        }
        handleSubmit();
        return;
      }
      if (inputRef === 'email') {
        checkEmailExist().then(() => {
          this.handleStepChange(step + 1);
        });
        return;
      }
      this.handleNextStep();
    }
  }

  renderStep() {
    const {
      hasPreStep,
      hasNextStep,
      handleSubmit
    } = this.props;
    if (!hasPreStep) {
      return (
        <div className="steps_wrapper">
          <div
            onClick={this.handleNextStep}
            className="button button_mini step_button">
            <i
              className="fa fa-arrow-right step_action"
              aria-hidden="true"></i>
          </div>
        </div>
      );
    }
    if (!hasNextStep) {
      return (
        <div className="steps_wrapper">
          <div
            onClick={this.handlePreStep}
            className="button grey button_mini step_button">
            <i
              className="fa fa-arrow-left step_action"
              aria-hidden="true"></i>
          </div>
          <div
            onClick={handleSubmit}
            className="button button_mini step_button">
            <i
              className="fa fa-space-shuttle step_action"
              aria-hidden="true"></i>
            </div>
        </div>
      );
    }
    return (
      <div className="steps_wrapper">
        <div
          onClick={this.handlePreStep}
          className="button grey button_mini step_button">
          <i
            className="fa fa-arrow-left step_action"
            aria-hidden="true"></i>
        </div>
        <div
          onClick={this.handleNextStep}
          className="button button_mini step_button">
          <i
            className="fa fa-arrow-right step_action"
            aria-hidden="true"></i>
          </div>
      </div>
    )
  }

  renderInputs() {
    const {inputs, loginInfo} = this.props;
    return inputs.map((loginInput, index) => {
      const {ref, placeholder, type} = loginInput;
      const value = loginInfo[ref];
      return (
        <input
          ref={ref}
          key={index}
          type={type}
          value={value}
          onChange={() => {
            this.handleInputChange(ref);
          }}
          className="input input_huge login_input"
          onKeyDown={(e) => {
            this.handleKeyDown(e, ref);
          }}
          onBlur={() => {
            this.handleBlur(ref);
          }}
          placeholder={placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div className="loginform_container">
        {this.renderInputs()}
        {this.renderStep()}
      </div>
    )
  }
}

export default LoginForm;
