import koaRouter from 'koa-router';
import user from '../controllers/user';
import {
  checkIfNotLogin,
  checkIfUserLogin,
  checkIfLogin
} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/user'
});

router.post('/login', checkIfUserLogin, user.login);
router.post('/signup', checkIfUserLogin, user.signup);
router.get('/logout', user.logout);
router.post('/check_email', checkIfNotLogin(), user.checkEmail);
router.get('/:id/info', user.userInfo);
router.post('/info', user.userInfo);
router.get('/', checkIfLogin(), user.home);

module.exports = router;
