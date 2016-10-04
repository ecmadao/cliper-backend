import koaRouter from 'koa-router';
import cliper from '../controllers/cliper';
import {checkIfNotLogin, checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/cliper'
});

router.get('/all', checkIfLogin(), cliper.all);
router.post('/new', cliper.add);
router.get('/:id', checkIfLogin(), cliper.getCliper);
router.delete('/:id', checkIfLogin(), cliper.deleteCliper);
router.get('/:id/update', checkIfLogin(), cliper.updateCliper);
router.get('/:id/comments', checkIfLogin(), cliper.getComments);
router.get('/', checkIfLogin(), cliper.all);

module.exports = router;
