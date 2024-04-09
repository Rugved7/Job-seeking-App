import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import { dbConnection } from "./Database/ConnectDB.js";
import { errorMiddleware } from "./middleware/error.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/app", appRoutes);
app.use("/api/v1/job", jobRoutes);

// Database Connection
dbConnection();
app.use(errorMiddleware);
export default app;
