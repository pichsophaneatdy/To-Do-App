// typeDefs
const typeDefs = `#graphql
    type Task {
        id: ID!
        task: String!
        description: String
        isCompleted: Boolean
    }
    type Query {
        allTasks: [Task]
        activeTasks: [Task]
    }
    type Mutation {
        createTask(task: String!, description: String, isCompleted: Boolean): Task
        updateTaskStatus(id: ID!): Task
        deleteTask(id: ID!): Task
    }
`;
export default typeDefs;
