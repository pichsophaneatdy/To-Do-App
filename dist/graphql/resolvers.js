import Task from "../database/taskModel.js";
const resolvers = {
    Query: {
        allTasks: async () => {
            try {
                return await Task.find();
            }
            catch (error) {
                console.log("Error fetching tasks", error);
                throw new Error("Failed to fetch tasks");
            }
        },
        activeTasks: async () => {
            try {
                const activeTasks = await Task.find({ isCompleted: false });
                return activeTasks;
            }
            catch (error) {
                console.error("Error fetching active tasks:", error);
                throw new Error("Failed to fetch active tasks");
            }
        }
    },
    Mutation: {
        createTask: async (parent, { task, description, isCompleted }, contextValue) => {
            try {
                const newTask = new Task({ task, description, isCompleted });
                return await newTask.save();
            }
            catch (error) {
                console.error("Error creating task:", error);
                throw new Error("Failed to create task");
            }
        },
        updateTaskStatus: async (parent, { id }, contextValue) => {
            try {
                await Task.findOneAndUpdate({ _id: id }, { isCompleted: true });
                // Return most updated task info
                return await Task.findById(id);
            }
            catch (error) {
                console.error("Error updating task status:", error);
                throw new Error("Failed to update task status");
            }
        },
        deleteTask: async (parent, { id }, contextValue) => {
            try {
                return await Task.findByIdAndDelete(id);
            }
            catch (error) {
                console.error("Error deleting task:", error);
                throw new Error("Failed to delete task");
            }
        }
    }
};
export default resolvers;
