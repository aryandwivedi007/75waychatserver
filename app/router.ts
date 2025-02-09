import express from "express";
import userRoutes from "./user/user.routes";

// routes
const routers = express.Router();

routers.use("/users", userRoutes);

export default routers;