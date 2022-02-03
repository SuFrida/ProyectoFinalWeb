let mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = Schema ({
    titulo: String,
    task_due: String,
    task_description: String,
    task_status: String,
    user_id: String
})