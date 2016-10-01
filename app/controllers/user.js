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
  console.log('email: ', email);
  console.log('password: ', password);
  const user = await User.signUp(email, password);
  console.log('signup user is');
  console.log(user);
  ctx.body = {
    data: user,
    success: true
  }
};

const login = async (ctx, next) => {
  const [email, password] = getUserInfo(ctx);
  const user = await User.logIn(email, password);
  console.log('signup user is');
  console.log(user);
  ctx.body = {
    data: user,
    success: true
  }
};

const logout = async (ctx, next) => {
  await User.logout();
  ctx.session.userId = null;
};

// const currentUser = await User.currentUser();
// ctx.body = {
//   data: currentUser
// };

export default {
  login,
  logout,
  signup,
  clipers
}
