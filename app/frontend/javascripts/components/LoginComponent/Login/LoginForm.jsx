import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreStep = this.handlePreStep.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  validateCanStepChange() {
    const {inputs, loginInfo} = this.props;
    const validateResults = inputs.map((loginInput) => {
      const {ref, validator} = loginInput;
      const value = loginInfo[ref];
      const result = validator(value);
      if (!result.result) {
        // console.log(result.message);
        alert(result.message);
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
    if (inputRef === 'email' && this.validateCanStepChange()) {
      const {checkEmailExist} = this.props;
      checkEmailExist && checkEmailExist();
    }
  }

  handleNextStep() {
    const result = this.validateCanStepChange();
    if (result) {
      const {step, handleStepChange} = this.props;
      handleStepChange && handleStepChange(step + 1);
    }
  }

  handlePreStep() {
    const {step, handleStepChange} = this.props;
    handleStepChange && handleStepChange(step - 1);
  }

  handleKeyDown(e, inputRef) {
    if (e.which === 13) {
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
        this.handleSubmit();
        return;
      }
      if (inputRef === 'email') {
        if (!this.validateCanStepChange()) {
          return;
        }
        checkEmailExist().then(() => {
          handleStepChange && handleStepChange(step + 1);
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
            className="button button_mini step_button">下一步</div>
        </div>
      );
    }
    if (!hasNextStep) {
      return (
        <div className="steps_wrapper">
          <div
            onClick={this.handlePreStep}
            className="button grey button_mini step_button">上一步</div>
          <div
            onClick={handleSubmit}
            className="button button_mini step_button">提交</div>
        </div>
      );
    }
    return (
      <div className="steps_wrapper">
        <div
          onClick={this.handlePreStep}
          className="button grey button_mini step_button">上一步</div>
        <div
          onClick={this.handleNextStep}
          className="button button_mini step_button">下一步</div>
      </div>
    )
  }

  renderInputs() {
    const {inputs, loginInfo} = this.props;
    return inputs.map((loginInput, index) => {
      const {ref} = loginInput;
      const value = loginInfo[ref];
      return (
        <input
          ref={ref}
          key={index}
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
          placeholder={loginInput.placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div className="inputs_container">
        {this.renderInputs()}
        {this.renderStep()}
      </div>
    )
  }
}

export default LoginForm;
