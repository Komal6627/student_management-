import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teacherRoute from "./routes/teacherRoute.js"
import studentRoute from "./routes/studentRoute.js"
import classRoute from "./routes/classRoute.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


app.use("/api/teacher",teacherRoute)
app.use("/api/student",studentRoute)
app.use("/api/class", classRoute )


const url = process.env.MONGO_URL;


mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


const server = app.listen(process.env.PORT , () => {
  console.log(`Server started on PORT ${process.env.PORT }`);
});
