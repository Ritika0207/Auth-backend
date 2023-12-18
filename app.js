import express from "express";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"


export const app = express();
config({
    path : "./data/.env"
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin : [process.env.FRONTEND_URL],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true
}))
app.use("/api/users", userRouter);
app.use("/api/task", taskRouter)

app.get("/", (req, res) => {
    res.send("nice working");
  });

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware)