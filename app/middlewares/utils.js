export const checkIfLogin = (redirect = null) => {
  return async (ctx, next) => {
    const userId = ctx.session.userId;
    if (!userId) {
      ctx.body = {
        success: false,
        message: '请先登录',
        data: null
      }
      return;
    }
    await next();
  }
};

export const checkIfNotLogin = (redirect = null) => {
  return async (ctx, next) => {
    const userId = ctx.session.userId;
    if (userId) {
      ctx.body = {
        success: false,
        message: '请勿重复登录',
        data: null
      }
      return;
    }
    await next();
  }
};
