import koaRouter from 'koa-router';
import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});

router.get('csrf', home.csrf);

module.exports = router;
