import objectAssign from 'object-assign';
import {
  validateEmail,
  validatePassword,
  validateEqual
} from '../../utils/validator';

const EMAIL = 'email';
const PASSWORD = 'password';
const REPEAT_PASSWORD = 'repeatPassword';

const checkIfIsValidate = (validator, message) => {
  return (value) => {
    const result = validator(value);
    if (result) {
      return {
        result: true
      };
    }
    return {
      result: false,
      message: message
    };
  }
};

const emailInput = {
  placeholder: '请填写邮箱',
  type: 'email',
  validator: checkIfIsValidate(validateEmail, '请输入合法的邮箱'),
  ref: EMAIL
};

const passwordInput = {
  placeholder: '请填写密码（8~16位）',
  type: 'password',
  validator: checkIfIsValidate(validatePassword, '请输入8~16位的密码'),
  ref: PASSWORD
};

const repeatPasswordInput = {
  placeholder: '重复输入密码',
  type: 'password',
  validator: validatePassword,
  ref: REPEAT_PASSWORD
};

export const STEP_ONE = [emailInput];
export const LOGIN_STEP = [passwordInput];
export const REGISTER_STEP = [passwordInput, repeatPasswordInput];
export const STEP_TWO = REGISTER_STEP;

const STATE = {
  step: 0,
  steps: [STEP_ONE, STEP_TWO],
  loginInfo: {},
  submitType: "login",
  loading: true
};

export const getDefaultState = () => {
  let state = objectAssign({}, STATE);
  state.loginInfo[EMAIL] = '';
  state.loginInfo[PASSWORD] = '';
  state.loginInfo[REPEAT_PASSWORD] = '';
  return state;
};
