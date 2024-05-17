const express = require("express")
const authMiddleware = require("../utils/authMiddleware")
const taskRouter = express.Router()
const taskController = require("../controllers/taskController")
const dummy = () => {
    return "Dummy"
}
/* Get all tasks */
taskRouter.get("/tasks", authMiddleware, dummy)
/* Filter tasks by status 
/tasks/bystatus?status=pending
*/

taskRouter.get("/tasks", dummy)
/* GET task by id */
taskRouter.get("/tasks", dummy)
/*POST new task */
taskRouter.post("/tasks", authMiddleware, taskController.createTask)
/* PATCH update task */
taskRouter.patch("/task/:id", dummy)
/* DELETE task */
taskRouter.delete("/tasks/:id", dummy)
module.exports = taskRouter