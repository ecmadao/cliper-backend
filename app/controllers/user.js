import User from '../services/user';
import SendCloud from '../services/sendcloud';

const getUserInfo = (ctx) => {
  const requestData = ctx.request.body;
  return [requestData.email, requestData.password];
};

const home = async (ctx, next) => {
  ctx.body = 'home page';
};

const signup = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.signUp(email, password.toString());
  ctx.session.userId = user.objectId;
  ctx.body = {
    data: user,
    success: true,
    url: '/user'
  }
  SendCloud.sendRegisterEmail(email);
};

const login = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.logIn(email, password);
  ctx.session.userId = user.objectId;
  ctx.body = {
    data: user,
    success: true,
    url: '/user'
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

const checkEmail = async (ctx, next) => {
  const requestData = ctx.request.body;
  const email = requestData.email;
  const user = await User.getUser(email);
  const hasUser = user && user.length === 1;
  const message = hasUser ? '存在账户，请登录' : '账户不存在，欢迎注册';
  ctx.body = {
    success: hasUser,
    message
  };
};

export default {
  login,
  logout,
  signup,
  home,
  checkEmail
}
