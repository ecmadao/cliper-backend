import koaRouter from 'koa-router';
import home from '../controllers/home';
import {checkIfNotLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/'
});

router.get('csrf', home.csrf);
router.get('login', checkIfNotLogin(), home.login);

module.exports = router;
