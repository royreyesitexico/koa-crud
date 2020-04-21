const Sequelize = require('sequelize');
const sequelize = new Sequelize('koa', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 32769,
});

const Todo = sequelize.define('todo', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
  },
  done: {
    type: Sequelize.BOOLEAN,
    field: 'done'
  }
})

module.exports = Todo;
