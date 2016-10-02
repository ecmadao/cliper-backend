import koaRouter from 'koa-router';
import user from '../controllers/user';
import {checkIfNotLogin, checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/user'
});

router.post('/login', checkIfNotLogin(), user.login);
router.post('/signup', checkIfNotLogin(), user.signup);
router.get('/logout', user.logout);
router.post('/check_email', checkIfNotLogin(), user.checkEmail);
router.get('/', checkIfLogin(), user.home);

module.exports = router;
