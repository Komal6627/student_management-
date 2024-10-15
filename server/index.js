import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; 



const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
    
})
