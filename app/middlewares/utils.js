export const checkIfUserLogin = async (ctx, next) => {
  const userId = ctx.session.userId;
  const user = ctx.session.user;
  if (user) {
    ctx.body = {
      success: true,
      message: '已登录',
      data: user
    }
    return;
  }
  await next();
};

export const checkIfLogin = (redirect = '/login') => {
  return async (ctx, next) => {
    const userId = ctx.session.userId;
    if (!userId) {
      return ctx.redirect(redirect);
      // ctx.body = {
      //   success: false,
      //   message: '请先登录',
      //   data: null
      // }
      // return;
    }
    await next();
  }
};

export const checkIfNotLogin = (redirect = '/user') => {
  return async (ctx, next) => {
    const userId = ctx.session.userId;
    if (userId) {
      return ctx.redirect(redirect);
      // ctx.body = {
      //   success: false,
      //   message: '请勿重复登录',
      //   data: null
      // }
      // return;
    }
    await next();
  }
};

export const getHiddenEmail = (email) => {
  return `${email.slice(0, 2)}**@**${email.slice(-3)}`;
};

export const checkIsEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
