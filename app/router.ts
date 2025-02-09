import express from "express";
import userRoutes from "./user/user.routes";
import roomRouter from "./room/room.routes";

// routes
const routers = express.Router();

routers.use("/users", userRoutes);
routers.use("/rooms",roomRouter)

export default routers;