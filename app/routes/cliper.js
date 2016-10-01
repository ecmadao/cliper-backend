import koaRouter from 'koa-router';
import cliper from '../controllers/cliper';
import {checkIfNotLogin, checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/cliper'
});

router.get('/all', checkIfLogin(), cliper.all);
router.get('/:id', checkIfLogin(), cliper.cliper);
router.get('/', checkIfLogin(), cliper.all);

module.exports = router;
