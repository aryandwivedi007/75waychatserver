import expressAsyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import * as roomService from './room.service'
import { createResponse } from "../common/helper/response.helper";
import { ParamsDictionary } from "express-serve-static-core";

export const createRoom=expressAsyncHandler(async(req:Request,res:Response)=>{
    const result=await roomService.createRoom(req.body)
    res.send(createResponse(result, "User created sucssefully"))
})

export const getRoomById=expressAsyncHandler(async(req:Request,res:Response)=>{
    const {roomId}=req.params
    const result=await roomService.getRoomById(roomId)
    res.send(createResponse(result,"Room data fetched successfully"))
})