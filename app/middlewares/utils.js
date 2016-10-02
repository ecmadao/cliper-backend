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
