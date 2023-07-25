import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task: String,
    description: String, 
    is_completed: {
        default: false
    }
})
export default mongoose.model("Task", TaskSchema) 