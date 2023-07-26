import Task from "../database/taskModel.js";

// Interface to define Task Object
interface TaskInterface {
    id: string,
    task: string,
    description?: string,
    isCompleted?: boolean
}

const resolvers = {
    Query: {
        // Fetching all tasks
        allTasks: async (): Promise<TaskInterface[]> => {
            try {
                return await Task.find();
            } catch(error) {
                console.log("Error fetching tasks", error);
                throw new Error("Failed to fetch tasks");
            }
        },
        // Fetching active tasks
        activeTasks: async (): Promise<TaskInterface[]> => {
            try {
                return await Task.find({isCompleted: false});
            } catch(error) {
                console.error("Error fetching active tasks:", error);
                throw new Error("Failed to fetch active tasks");
            }
            
        }
    },
    Mutation: {
        // Create a new task
        createTask: async (parent,args: { task: string; description: string; isCompleted: boolean }, contextValue) => {
            try {
                const newTask = new Task({
                    task: args.task,
                    description: args.description,
                    isCompleted: args.isCompleted,
                });
                // Save new task to database and return it
                return await newTask.save();
            } catch (error) {
                console.error("Error creating task:", error);
                throw new Error("Failed to create task");
            }
        },
        // Update task status
        updateTaskStatus: async (parent,args: {id: string}, contextValue) => {
            try {
                await Task.findOneAndUpdate({_id: args.id}, {isCompleted: true});
                // Return most updated task info
                return await Task.findById(args.id);
            } catch(error){
                console.error("Error updating task status:", error);
                throw new Error("Failed to update task status");
            }
        },
        // Deleting task
        deleteTask: async (parent,args: {id: string}, contextValue) => {
            try {
                // return the deleted task
                return await Task.findByIdAndDelete(args.id);
            } catch(error) {
                console.error("Error deleting task:", error);
                throw new Error("Failed to delete task");
            }
            
        }
    }
};

export default resolvers