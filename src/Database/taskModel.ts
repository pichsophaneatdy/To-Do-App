import mongoose from "mongoose";

// Define Task Schema
const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    description: {
        type:String,
        default: "No detail"
    }, 
    isCompleted: {
        type: Boolean,
        default: false
    }
})
// Create and Export Task Model
export default mongoose.model("Task", TaskSchema) 