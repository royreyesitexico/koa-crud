const Todo = require('./todo');

class TodoTableUtils {
  async clearTable(){
    await Todo.destroy({
      where: {},
      truncate: true
    })
  }
}

module.exports = TodoTableUtils;