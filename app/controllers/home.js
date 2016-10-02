const index = async (ctx, next) => {
  ctx.session.userId = null;
  ctx.session.token = null;
  // ctx.body = 'this is home page';
  ctx.redirect('/login');
};

const csrf = async (ctx, next) => {
  ctx.body = {
    data: ctx.csrf,
    success: true
  }
};

const login = async (ctx, next) => {
  await ctx.render('home/login', {
    title: 'login page'
  });
};

export default {
  index,
  csrf,
  login
}
