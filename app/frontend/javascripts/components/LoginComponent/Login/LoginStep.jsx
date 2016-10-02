import React from 'react';

class LoginStep extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreStep = this.handlePreStep.bind(this);
  }

  handleNextStep() {
    const {
      step,
      handleStepChange
    } = this.props;
    handleStepChange && handleStepChange(step + 1)
  }

  handlePreStep() {
    const {
      step,
      handleStepChange
    } = this.props;
    handleStepChange && handleStepChange(step - 1)
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

  render() {
    return (
      <div className="steps_container">
        {this.renderStep()}
      </div>
    )
  }
}

export default LoginStep;
