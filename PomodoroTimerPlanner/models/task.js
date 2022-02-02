let mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = Schema ({
    email: Number,
    titulo: String,
    task_creation: Date.now,
    task_due: {
        type: Date,
        default: Date.now
    },
    task_description: String,
    task_status: String
})