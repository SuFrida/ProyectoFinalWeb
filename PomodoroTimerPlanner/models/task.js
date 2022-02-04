let mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = Schema ({
    titulo: {
        type: String,
        required: true
    },
    task_due: {
        type: String,
        required: false
    },
    task_description: {
        type: String,
        required: false
    },
    task_status: {
        type: Boolean ,
        required: false
    },
    user_id: String
})

module.exports = mongoose.model('tasks', TaskSchema)