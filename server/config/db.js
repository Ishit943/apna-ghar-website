// Import mongoose
import mongoose from "mongoose";

// Database connection function
const connectDB = async () => {
  try {
    // Log connection attempt
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("📍 URI Host:", process.env.MONGODB_URI?.split("@")[1]?.split("?")[0] || "Not set");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    console.error(
      "❌ MongoDB connection error:",
      error.message
    );
    console.error("🔍 Error Code:", error.code);
    console.error("🔍 Full Error:", error);

    // Don't exit immediately - let server run without DB
    console.warn("⚠️ Server will run but database operations will fail");
    // Uncomment to exit on connection failure:
    // process.exit(1);
  }
};

// Export function
export default connectDB;