import User from '../services/user';

const getUserInfo = (ctx) => {
  const requestData = ctx.request.body;
  return [requestData.email, requestData.password];
};

const clipers = async (ctx, next) => {
  ctx.body = {
    data: [],
    success: true
  };
};

const signup = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.signUp(email, password.toString());
  ctx.body = {
    data: user,
    success: true
  }
};

const login = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.logIn(email, password);
  ctx.body = {
    data: user,
    success: true
  }
};

const logout = async (ctx, next) => {
  await User.logout();
  ctx.session.userId = null;
  ctx.body = {
    data: null,
    success: true
  }
};

export default {
  login,
  logout,
  signup,
  clipers
}
