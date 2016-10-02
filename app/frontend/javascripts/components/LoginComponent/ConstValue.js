import objectAssign from 'object-assign';
import {
  validateEmail,
  validatePassword,
  validateEqual
} from '../../utils/validator';

const EMAIL = 'email';
const PASSWORD = 'password';
const REPEAT_PASSWORD = 'repeatPassword';

const emailInput = {
  placeholder: '请填写邮箱',
  type: 'email',
  validators: [validateEmail],
  ref: EMAIL
};

const passwordInput = {
  placeholder: '请填写密码',
  type: 'password',
  validators: [validatePassword],
  ref: PASSWORD
};

const repeatPasswordInput = {
  placeholder: '重复密码',
  type: 'password',
  validators: [validatePassword],
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
  submitType: "login"
};

export const getDefaultState = () => {
  let state = objectAssign({}, STATE);
  state.loginInfo[EMAIL] = '';
  state.loginInfo[PASSWORD] = '';
  state.loginInfo[REPEAT_PASSWORD] = '';
  return state;
};
