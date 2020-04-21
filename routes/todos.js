const Router = require('koa-router');
const TodosController = require('../controllers/todos');
const { checkCache } = require('../middlewares/cache')
const router = new Router({
  prefix: '/todos'
});

const todosController = new TodosController();

router.get('/', todosController.getAllTodos);
router.get('/:id',checkCache, todosController.getSingleTodo);
router.post('/', todosController.createTodo);
router.delete('/:id', todosController.deleteTodo);
router.put('/:id', todosController.updateTodo);

module.exports = router;
