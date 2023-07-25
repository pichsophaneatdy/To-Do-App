import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// typeDefs
const typeDefs = `#graphql
    type Task {
        id: ID
        task: String
        description: String
        is_complete: Boolean
    }
    type Query {
        tasks: [Task]
    }
    type Mutation {
        createTask(task: String, description: String, is_complete: Boolean): Task
        updateTaskStatus(id: ID!): Task
    }
`;
// Data
const tasks = [
    {
        "id": "1",
        "task": "Buy groceries",
        "description": "Buy fruits, vegetables, and bread",
        "is_complete": true
    },
    {
        "id": "2",
        "task": "Finish homework",
        "description": "Complete math and science assignments",
        "is_complete": false
    },
    {
        "id": "3",
        "task": "Walk the dog",
        "description": "Take the dog for a walk in the park",
        "is_complete": true
    },
    {
        "id": "4",
        "task": "Call mom",
        "description": "Give mom a call and catch up",
        "is_complete": false
    },
    {
        "id": "5",
        "task": "Prepare presentation",
        "description": "Create slides and rehearse for the meeting",
        "is_complete": true
    }
]
// Schema 
const TaskSchema = new mongoose.Schema({
    task: String,
    description: String, 
    is_completed: {
        type: Boolean,
        default: false
    }
})
const Task = mongoose.model("Task", TaskSchema);
// Resolvers 
const resolvers = {
    Query: {
        tasks() {
            return tasks;
        }
    },
    Mutation: {
        createTask(parent,args, contextValue) {
            let newTask = new Task({
                task: args.task,
                description: args.description,
                is_completed: args.is_completed
            })
            return newTask.save()
        }
    }
};
// Connect to DB and Start the Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const startServer = async() => {
    try {
        // Connect to MongoDB 
        await mongoose.connect(process.env.MONGODB_URI);
        const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        });
        console.log(`🚀  Connected to Database and Server ready at: ${url}`);
    } catch(error) {
        console.log(error);
    }
}
startServer();

