import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URL
const url = process.env.MONGO_URL;

// Connect to MongoDB without deprecated options
mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Exit the application if the database connection fails
    process.exit(1);
  });

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on PORT ${process.env.PORT || 5000}`);
});
