import express from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todosRoutes.js";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(`Error while connecting to Database: ${err}`);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.use(bodyParser.json());

// Use routes
app.use("/api/todos", todosRoutes);

// Initialize the database and create the table if not exists
db.serialize(() => {
  const create_table_query = `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now','localtime')),
    status TEXT DEFAULT 'Pending'
  );`;

  db.run(create_table_query, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log('Table "todos" created successfully');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

export default db;
