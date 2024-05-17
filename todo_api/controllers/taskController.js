const Task = require('../models/task')
const getAllTasks = async(req, res) => {
    const tasks = await Task.findAll({})
    return res.status(200).json({tasks})
}
const createTask = async (req, res) => {
    try {
        let { description, status, priority } = req.body
        if (!description || !status || !priority) {
            return res.status(409).json({ message: "Missing field" })
        }
        const newTask = Task.create({
            description, status, priority, userId:req.user.id
        })
        if (newTask) {
            res.status(201).json({ message: "Created new task in todo" })
        }
    } catch (e) {
        console.error("Error occured while creating task")
        res.status(500).json("Error occured while creating task", e.message)
    }

}

module.exports = {
    createTask,
    getAllTasks,
}