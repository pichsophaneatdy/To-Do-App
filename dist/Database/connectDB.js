import mongoose from "mongoose";
const connectDB = async (url) => {
    try {
        const connection = await mongoose.connect(url);
        return connection;
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
};
export default connectDB;
