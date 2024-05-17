const express = require("express")
const authMiddleware = require("../utils/authMiddleware")
const taskRouter = express.Router()
const taskController = require("../controllers/taskController")
const dummy = () => {
    return "Dummy"
}
/* Get all tasks */
taskRouter.get("/tasks/alltasks", authMiddleware, taskController.getAllTasks)
/* Filter tasks by status 
/tasks/bystatus?status=pending
*/

taskRouter.get("/tasks/bystatus", taskController.getByStatus)
/* GET task by id */
taskRouter.get("/tasks/:taskId", taskController.getTaskById)
/*POST new task */
taskRouter.post("/tasks", authMiddleware, taskController.createTask)
/* PATCH update task */
taskRouter.patch("/task/:id", dummy)
/* DELETE task */
taskRouter.delete("/tasks/:id", dummy)
module.exports = taskRouter