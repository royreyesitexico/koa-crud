const Todo = require('../models/todo');

class TodosController {
  async getAllTodos (ctx) {
    try {
      const todos = await Todo.findAll();
      ctx.body = todos;
    } catch (error) {
      ctx.status = 503;
    }
  };

  async getSingleTodo(ctx) {
    try {
      const { id } = ctx.params;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        ctx.status = 400;
        return;
      }
      try {
        await ctx.redis.set(id, JSON.stringify(todo));
      } catch (error) {
        console.error(error);
      } finally {
        ctx.body = todo;
      }
    } catch (error) {
      ctx.status = 503;
    }
  }

  async createTodo (ctx) {
    try {
      const newTodo = await Todo.create({ ...ctx.request.body });
      ctx.status = 201;
      ctx.body = newTodo;
    } catch (error) {
      ctx.status = 503;
    }
  };
  
  async deleteTodo (ctx) {
    try {
      const { id } = ctx.params;
      const todo = await Todo.findByPk(id)
      if (!todo) {
        ctx.status = 400;
        return;
      } 
      todo.destroy();
      try {
        await ctx.redis.del(id);
      } catch (error) {
        console.error(error);
      } finally {
        ctx.status = 204;
      }
    } catch (error) {
      ctx.status = 503;
    }
  };

  async updateTodo (ctx) {
    try {
      const todo = await Todo.findByPk(ctx.params.id)
      if (!todo) {
        ctx.status = 400;
        return;
      } 
      try {
        const updatedTodo = await todo.update({ ...ctx.request.body })
        ctx.body = updatedTodo;
      } catch (error) {
        ctx.status = 500;  
      }
    } catch (error) {
      ctx.status = 503;
    }
  }

}

module.exports = TodosController;
