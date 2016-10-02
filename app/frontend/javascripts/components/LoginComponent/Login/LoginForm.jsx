import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(ref) {
    const value = this.refs[ref].value;
    const {handleFormChange} = this.props;
    let newInfo = {};
    newInfo[ref] = value;
    handleFormChange && handleFormChange(newInfo);
  }

  handleKeyDown(e) {
    if (e.which === 13) {
      const {handleStepChange} = this.props;
      handleStepChange && handleStepChange();
    }
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
          onKeyDown={this.handleKeyDown}
          placeholder={loginInput.placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div className="inputs_container">
        {this.renderInputs()}
      </div>
    )
  }
}

export default LoginForm;
