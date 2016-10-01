import Cliper from '../services/cliper';

const all = async (ctx, next) => {
  ctx.body = {
    data: [],
    success: true
  }
};

const getCliper = async (ctx, next) => {
  ctx.data = {
    data: {},
    success: true
  }
};

const add = async (ctx, next) => {
  const requestData = ctx.request.body;
  const cliper = requestData.cliper;
  console.log('get cliper in backend');
  console.log(cliper);
  const result = await Cliper.addCliper(cliper);
  ctx.body = {
    success: true,
    data: result
  };
};

const deleteCliper = async (ctx, next) => {
  ctx.body = {
    data: null,
    success: true
  };
}

export default {
  all,
  add,
  deleteCliper,
  getCliper
}
