import express from "express";
import todosController from "../controllers/todosController.js";

const router = express.Router();

router.post("/", todosController.createTodo);
router.get("/", todosController.getAllTodos);
router.get("/:id", todosController.getTodoById);
router.put("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

export default router;
