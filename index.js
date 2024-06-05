import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";

const app = express();
const db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(`Error while connecting to Database: ${err}`);
  }
  console.log("Connected to the in-memory SQlite database.");
});

const insert_table_query = `INSERT INTO todos ( title , content ) VALUES ( ? , ? );`;
const get_all_query = `SELECT * FROM todos;`;
const get_one_query = `SELECT * FROM todos WHERE id = ? ;`;
const delete_by_id_query = `DELETE FROM todos WHERE id = ? ;`;
const update_query = `UPDATE todos SET title = ? , content = ? , status = ? WHERE id = ? ;`;
const create_table_query = `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now','localtime')),
    status TEXT DEFAULT 'Pending'
);`;

db.serialize(() => {
  db.run(create_table_query, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log('Table "todos" created successfully');
    }
  });
});

app.use(bodyParser.json());

app.post("/api/todos", (req, res) => {
  const { title, content } = req.body;

  db.run(insert_table_query, [title, content], (err) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).send({ message: "Internal server error" });
    }
    console.log(`A new todo has been added successfully`);

    const datetime = new Date().toLocaleString();
    res.send({
      Title: title,
      Content: content,
      Created_at: datetime,
      Status: "Pending",
    });
  });
});

app.get("/api/todos", (req, res) => {
  db.all(get_all_query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching todos:", err.message);
      return res.status(500).send({ message: "Internal server error" });
    }
    res.send(rows);
  });
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  db.get(get_one_query, [id], (err, row) => {
    if (err) {
      console.error(`Error fetching todos with id(${id}) :`, err.message);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (!row) {
      return res
        .status(404)
        .send({ message: `Todos with id(${id}) is not found` });
    }

    res.send(row);
  });
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const { title, content, status } = req.body;

  db.get(get_one_query, [id], (err, row) => {
    if (err) {
      console.error(`Error fetching todos with id(${id}) :`, err.message);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (!row) {
      return res
        .status(404)
        .send({ message: `Todos with id(${id}) is not found` });
    }

    db.run(update_query, [title, content, status, id], (err) => {
      if (err) {
        console.error(`Error updating todos with id(${id}): `, err.message);
        return res.status(500).send({ message: "Error occurred" });
      }
      res.send({ message: `Updated todos with id(${id}) successfully` });
    });
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  db.get(get_one_query, [id], (err, row) => {
    if (err) {
      console.error(`Error fetching todos with id(${id}) :`, err.message);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (!row) {
      return res
        .status(404)
        .send({ message: `Todos with id(${id}) is not found` });
    }

    db.run(delete_by_id_query, [id], (err) => {
      if (err) {
        console.error(`Error deleting todos with id(${id}) :`, err.message);
        return res.status(500).send({ message: "Error occurred" });
      }
      res.send({ message: `Todo with id(${id}) deleted successfully` });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
