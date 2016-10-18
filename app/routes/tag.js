import koaRouter from 'koa-router';
import tag from '../controllers/tag';
import {checkIfNotLogin, checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/tag'
});

router.post('/new', checkIfLogin(), tag.newTag);
router.get('/all', checkIfLogin(), tag.getTags);
router.get('/allTags', checkIfLogin(), tag.allTags);
router.delete('/:id', checkIfLogin(), tag.deleteTag);

module.exports = router;
