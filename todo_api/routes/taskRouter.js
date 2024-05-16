const express = require("express")
const taskRouter = express.Router()
const dummy = () => {
    return "Dummy"
}
/* Get all tasks */
taskRouter.get("/tasks", dummy)
/* Filter tasks by status 
/tasks/bystatus?status=pending
*/

taskRouter.get("/tasks", dummy)
/* GET task by id */
taskRouter.get("/tasks", dummy)
/*POST new task */
taskRouter.post("/tasks", dummy)
/* PATCH update task */
taskRouter.patch("/task/:id", dummy)
/* DELETE task */
taskRouter.delete("/tasks/:id", dummy)
module.exports = taskRouter