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
const getTaskById = async (req, res) => {
    const { taskId } = req.params
    const task = await Task.findOne({
        where: {
            id: taskId.trim()
        }
    })
    if (!task) {
        return res.status(404).json({ message: "No task with that id" })
    }
    return res.status(200).json({ task })
}
const updateStatus = async (req, res) => {
    const { taskId } = req.params
    const { status } = req.body
    if (!taskId) {
        return res.status(409).json({ message: "Task id missing" })
    }
    if (!status) {
        return res.status(409).json({ message: "New status missing" })
    }
    if (!status || !["undone", "pending", "done"].includes(status)) {
        return res.status(400).json({ message: "Invalid status query parameter" });
    }
    const updatedTask = await Task.update(
        { status }, {
        where: {
            id: taskId
        }
    }
    )
    if (!updatedTask) {
        return res.status(201).json({ message: "Couldn't update successfully" })
    }
    return res.status(200).json({ message: "Updated status successfully" })
}
const deleteTask = async (req, res) => {
    const { taskId } = req.params
    const deletedTask = await Task.destroy(
        {
            where: {
                id: taskId
            }
        }

    )
    if (!deletedTask) {
        return res.status(400).json({ message: "Task id parameter missing. Please pass it to delete this task" })

    }
    return res.status(200).json({ message: "Deleted item successfully" })

}
module.exports = {
    createTask,
    getAllTasks,
    getByStatus,
    getTaskById,
    updateStatus,
    deleteTask
}