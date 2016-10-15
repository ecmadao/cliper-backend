import User from '../services/user';
import Cliper from '../services/cliper';
import SendCloud from '../services/sendcloud';
import {
  getHiddenEmail,
  checkIsEmail
} from '../middlewares/utils';

const getUserInfo = (ctx) => {
  const requestData = ctx.request.body;
  return [requestData.email, requestData.password];
};

const getClipersNum = async (userId) => {
  return await Promise.all([
    Cliper.getUserClipersNum(userId), Cliper.getUserPagesNum(userId)
  ]);
}

const home = async (ctx, next) => {
  const user = ctx.session.user;
  const userId = ctx.session.userId;
  const {username, email, createdAt} = user;
  const name = checkIsEmail(username) ? getHiddenEmail(email) : username;
  const [clipersNum, pagesNum] = await getClipersNum(userId);
  const userInfo = {
    username: name,
    email: getHiddenEmail(email),
    joinedAt: createdAt,
    clipersNum: `${clipersNum} clipers, ${pagesNum} pages`
  };
  await ctx.render('home/user', {
    title: '个人主页 - cliper',
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

const userInfo = async (ctx, next) => {
  const userId = ctx.params.id;
  const [clipersNum, pagesNum] = await getClipersNum(userId);
  ctx.body = {
    success: true,
    data: `${clipersNum} clipers, ${pagesNum} pages`
  };
};

export default {
  login,
  logout,
  signup,
  home,
  userInfo,
  checkEmail
}
