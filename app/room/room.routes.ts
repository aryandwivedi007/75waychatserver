import { Router } from "express";
import * as roomValidator from './room.validation'
import { catchError } from "../common/middleware/catch-error.middleware";
import * as roomController from './room.controller'
const roomRouter=Router()

roomRouter
        .post('/',roomValidator.createRoom,catchError,roomController.createRoom)
        .get('/:roomId',catchError,roomController.getRoomById)


export default roomRouter