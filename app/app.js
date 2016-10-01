import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import csrf from 'koa-csrf';
import json from 'koa-json';
import session from 'koa-session';
import config from 'config';
import http from 'http';

import router from './routes/index';

const appKey = config.get('appKey');
const port = config.get('port');
const app = new Koa();
app.keys = [appKey];

// error handle
onerror(app);
// bodyparser
app.use(bodyParser());
// json parse
app.use(convert(json()));
// logger
app.use(convert(logger()));
// session
app.use(convert(session(app)));
// csrf
app.use(new csrf());
// helper func
app.use(async (ctx, next) => {
  ctx.state = {
    csrf: ctx.csrf
  };
  await next();
});
// router
app.use(router.routes(), router.allowedMethods());
// error
app.on('error', function(err, ctx){
  console.log(err);
  logger.error('server error', err, ctx);
});

app.listen(process.env.PORT || port);

export default app;
