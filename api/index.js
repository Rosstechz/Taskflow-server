// global imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//local imports
import connectDb from "../config/db.js";
import authRoutes from "../routes/auth/authRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";

//database connection
connectDb();

// configurations
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

//test endpoint
app.use("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "This is Express Test API Endpoint",
  });
});

// api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

console.log(process.env.NODE_ENV);

//listener
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}

export default app;
