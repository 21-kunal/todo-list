import db from "../index.js";

const todosModel = {
  insert: (title, content, callback) => {
    const insert_table_query = `INSERT INTO todos (title, content) VALUES (?, ?);`;
    db.run(insert_table_query, [title, content], callback);
  },

  getAll: (callback) => {
    const get_all_query = `SELECT * FROM todos;`;
    db.all(get_all_query, [], callback);
  },

  getOne: (id, callback) => {
    const get_one_query = `SELECT * FROM todos WHERE id = ?;`;
    db.get(get_one_query, [id], callback);
  },

  deleteById: (id, callback) => {
    const delete_by_id_query = `DELETE FROM todos WHERE id = ?;`;
    db.run(delete_by_id_query, [id], callback);
  },

  update: (id, title, content, status, callback) => {
    const update_query = `UPDATE todos SET title = ?, content = ?, status = ? WHERE id = ?;`;
    db.run(update_query, [title, content, status, id], callback);
  },
};

export default todosModel;
