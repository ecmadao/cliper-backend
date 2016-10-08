import koaRouter from 'koa-router';
import comment from '../controllers/comment';
import {checkIfNotLogin, checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/comment'
});

router.post('/new', checkIfLogin(), comment.newComment);
router.get('/:id', checkIfLogin(), comment.getComments);
router.delete('/:id', checkIfLogin(), comment.deleteComment);
router.put('/:id', checkIfLogin(), comment.updateComment);

module.exports = router;
