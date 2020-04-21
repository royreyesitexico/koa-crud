const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const todoRoutes = require('./routes/todos');
const { addCache } = require('./middlewares/cache')

const app = new Koa();
const PORT = process.env.KOA_PORT || 5000;

app.use(bodyParser());
app.use(addCache);
app.use(todoRoutes.routes());

const server = app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
})

module.exports = server;
