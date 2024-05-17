const express = require("express")
const authMiddleware = require("../utils/authMiddleware")
const taskRouter = express.Router()
const taskController = require("../controllers/taskController")

/* Get all tasks */
taskRouter.get("/tasks/alltasks", authMiddleware, taskController.getAllTasks)
/* Filter tasks by status 
/tasks/bystatus?status=pending
*/

taskRouter.get("/tasks/bystatus", authMiddleware, taskController.getByStatus)
/* GET task by id */
taskRouter.get("/tasks/:taskId", authMiddleware, taskController.getTaskById)
/*POST new task */
taskRouter.post("/tasks", authMiddleware, taskController.createTask)
/* PATCH update task */
taskRouter.patch("/task/:taskId", authMiddleware, taskController.updateStatus)
/* DELETE task */
taskRouter.delete("/tasks/:id", authMiddleware, taskController.deleteTask)

module.exports = taskRouter