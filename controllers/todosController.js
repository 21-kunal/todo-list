import todosModel from "../models/todosModel.js";

const todosController = {
  createTodo: (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .send({ message: "Title and content are required" });
    }

    todosModel.insert(title, content, (err) => {
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
  },

  getAllTodos: (req, res) => {
    todosModel.getAll((err, rows) => {
      if (err) {
        console.error("Error fetching todos:", err.message);
        return res.status(500).send({ message: "Internal server error" });
      }
      res.send(rows);
    });
  },

  getTodoById: (req, res) => {
    const id = req.params.id;

    if (isNaN(parseInt(id))) {
      return res
        .status(400)
        .send({ message: "ID parameter must be a valid integer" });
    }

    todosModel.getOne(parseInt(id), (err, row) => {
      if (err) {
        console.error(`Error fetching todos with id(${id}):`, err.message);
        return res.status(500).send({ message: "Internal server error" });
      }

      if (!row) {
        return res
          .status(404)
          .send({ message: `Todo with id(${id}) is not found` });
      }

      res.send(row);
    });
  },

  updateTodo: (req, res) => {
    const id = req.params.id;
    const { title, content, status } = req.body;

    if (isNaN(parseInt(id))) {
      return res
        .status(400)
        .send({ message: "ID parameter must be a valid integer" });
    }

    if (!title || !content || !status) {
      return res
        .status(400)
        .send({ message: "Title, content, and status are required" });
    }

    todosModel.getOne(parseInt(id), (err, row) => {
      if (err) {
        console.error(`Error fetching todos with id(${id}):`, err.message);
        return res.status(500).send({ message: "Internal server error" });
      }

      if (!row) {
        return res
          .status(404)
          .send({ message: `Todo with id(${id}) is not found` });
      }

      todosModel.update(parseInt(id), title, content, status, (err) => {
        if (err) {
          console.error(`Error updating todos with id(${id}):`, err.message);
          return res.status(500).send({ message: "Error occurred" });
        }
        res.send({ message: `Updated todo with id(${id}) successfully` });
      });
    });
  },

  deleteTodo: (req, res) => {
    const id = req.params.id;

    if (isNaN(parseInt(id))) {
      return res
        .status(400)
        .send({ message: "ID parameter must be a valid integer" });
    }

    todosModel.getOne(parseInt(id), (err, row) => {
      if (err) {
        console.error(`Error fetching todos with id(${id}):`, err.message);
        return res.status(500).send({ message: "Internal server error" });
      }

      if (!row) {
        return res
          .status(404)
          .send({ message: `Todo with id(${id}) is not found` });
      }

      todosModel.deleteById(parseInt(id), (err) => {
        if (err) {
          console.error(`Error deleting todo with id(${id}):`, err.message);
          return res.status(500).send({ message: "Error occurred" });
        }
        res.send({ message: `Todo with id(${id}) deleted successfully` });
      });
    });
  },
};

export default todosController;
