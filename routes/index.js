const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  }
});

module.exports = router;
