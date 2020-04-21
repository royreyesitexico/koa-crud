const request = require('supertest');
const app = require('../server');
const TodoUtils = require('../models/todo.utils');
const todoUtils = new TodoUtils();


beforeAll(() => {
  return todoUtils.clearTable();
})

describe('Todos endpoints', () => {
  it('should get empty array', async () => {
    const response = await request(app)
      .get('/todos/')
      .send()
    expect(response.status).toEqual(200)
    expect(response.body).toEqual([]);
  });

  it('should create a todo', async () => {
    const body = {
      title: 'First todo',
      description: 'todo',
      done: false
    }
    const response = await request(app)
      .post('/todos')
      .send(body)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(body);
  });

  it('should get a todo by id', async () => {
    const body = {
      title: 'First todo',
      description: 'todo',
      done: true
    }
    const todo = (await request(app)
      .post('/todos')
      .send(body)).body


    const response = await request(app)
      .get('/todos/' + todo.id)
      .send()
    
    delete todo.createdAt;
    delete todo.updatedAt;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(todo);
  });

  it('should detele a todo', async () => {
    const body = {
      title: 'First todo',
      description: 'todo',
      done: true
    }
    const todo = (await request(app)
      .post('/todos')
      .send(body)).body

    const response = await request(app)
      .delete('/todos/' + todo.id)
      .send()

    expect(response.status).toBe(204);
  });

  it('should update a todo', async () => {
    const body = {
      title: 'First todo',
      description: 'todo',
      done: false
    };

    const todo = (await request(app)
      .post('/todos')
      .send(body)).body

    const updatedTodo = {
      ...todo,
      done: true
    };

    delete updatedTodo.createdAt;
    delete updatedTodo.updatedAt;

    const response = await request(app)
      .put('/todos/' + updatedTodo.id)
      .send(updatedTodo);

    expect(response.body).toMatchObject(updatedTodo);
  });

});