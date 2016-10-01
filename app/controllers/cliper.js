const all = async (ctx, next) => {
  ctx.body = {
    data: [],
    success: true
  }
};

const cliper = async (ctx, next) => {
  ctx.data = {
    data: {},
    success: true
  }
};

export default {
  all,
  cliper
}
