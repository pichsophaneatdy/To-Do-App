import Task from "../Database/taskModel.js";
const resolvers = {
    Query: {
        // Fetching all tasks
        allTasks: async () => {
            try {
                return await Task.find();
            }
            catch (error) {
                console.log("Error fetching tasks", error);
                throw new Error("Failed to fetch tasks");
            }
        },
        // Fetching active tasks
        activeTasks: async () => {
            try {
                return await Task.find({ isCompleted: false });
            }
            catch (error) {
                console.error("Error fetching active tasks:", error);
                throw new Error("Failed to fetch active tasks");
            }
        }
    },
    Mutation: {
        // Create a new task
        createTask: async (parent, args, contextValue) => {
            try {
                const newTask = new Task({
                    task: args.task,
                    description: args.description,
                    isCompleted: args.isCompleted,
                });
                // Save new task to database and return it
                return await newTask.save();
            }
            catch (error) {
                console.error("Error creating task:", error);
                throw new Error("Failed to create task");
            }
        },
        // Update task status
        updateTaskStatus: async (parent, args, contextValue) => {
            try {
                await Task.findOneAndUpdate({ _id: args.id }, { isCompleted: true });
                // Return most updated task info
                return await Task.findById(args.id);
            }
            catch (error) {
                console.error("Error updating task status:", error);
                throw new Error("Failed to update task status");
            }
        },
        // Deleting task
        deleteTask: async (parent, args, contextValue) => {
            try {
                // return the deleted task
                return await Task.findByIdAndDelete(args.id);
            }
            catch (error) {
                console.error("Error deleting task:", error);
                throw new Error("Failed to delete task");
            }
        }
    }
};
export default resolvers;
