const Task = require('../models/taskModel')
const createTask = (req, res) => {
    try {
        let { description, status, priority } = req.body
        if (!description || !status || !priority) {
            return res.status(409).json({ message: "Missing field" })
        }
        const newTask = new Task({
            description, status, priority
        })
    } catch (e) {
        console.error("Error occured while creating task")
        res.status(500).json("Error occured while creating task", e.message)
    }

}
module.exports = {
    createTask
}