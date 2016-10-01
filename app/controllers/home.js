const index = async (ctx, next) => {
  // ctx.session.userId = null;
  // ctx.session.token = null;
  ctx.body = 'this is home page';
};

const csrf = async (ctx, next) => {
  ctx.body = {
    data: ctx.csrf,
    success: true
  }
};

export default {
  index,
  csrf
}
