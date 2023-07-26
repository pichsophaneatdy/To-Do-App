import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
// Connect to MongoDB Function
import connectDB from "./Database/connectDB.js";
// Schema and Resolvers
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
dotenv.config();
// Connect to DB and Start the Server
const startServer = async () => {
    try {
        // Connect to MongoDB 
        await connectDB(process.env.MONGODB_URI);
        // Create an Apoller Server
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        // Start the server
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Connected to Database and Server ready at: ${url}`);
    }
    catch (error) {
        console.log("Error starting the server", error);
        process.exit(1);
    }
};
startServer();
