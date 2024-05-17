const Task = require('../models/task')
const getAllTasks = async (req, res) => {
    const tasks = await Task.findAll({})
    return res.status(200).json({ tasks })
}
const getByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        if (!status || !["undone", "pending", "done"].includes(status)) {
            return res.status(400).json({ message: "Invalid or missing status query parameter" });
        }

        const tasksFilteredByStatus = await Task.findAll({
            where: {
                status: status.trim()
            }
        });

        if (!tasksFilteredByStatus.length) {
            return res.status(404).json({ message: "No tasks found under that filter" });
        }

        return res.status(200).json({ tasks: tasksFilteredByStatus });
    } catch (error) {
        console.error("Error occurred while getting tasks by status:", error.message);
        return res.status(500).json({ message: "Error occurred while getting tasks by status", error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        let { description, status, priority } = req.body
        if (!description || !status || !priority) {
            return res.status(409).json({ message: "Missing field" })
        }
        const newTask = Task.create({
            description, status, priority, userId: req.user.id
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
    getByStatus
}