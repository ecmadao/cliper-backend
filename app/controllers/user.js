import User from '../services/user';
import SendCloud from '../services/sendcloud';
import {
  getHiddenEmail
} from '../middlewares/utils';

const getUserInfo = (ctx) => {
  const requestData = ctx.request.body;
  return [requestData.email, requestData.password];
};

const home = async (ctx, next) => {
  const user = ctx.session.user;
  const userInfo = {
    username: user.username,
    email: getHiddenEmail(user.email),
    joinedAt: user.createdAt
  };
  await ctx.render('home/user', {
    title: '个人主页',
    userInfo
  });
};

const signup = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.signUp(email, password.toString());
  ctx.session.userId = user.id;
  ctx.session.user = user;
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
  ctx.session.userId = user.id;
  ctx.session.user = user;
  ctx.body = {
    data: user,
    success: true,
    url: '/user'
  }
};

const logout = async (ctx, next) => {
  await User.logout();
  ctx.session.userId = null;
  ctx.session.user = null;
  ctx.redirect('/login');
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
