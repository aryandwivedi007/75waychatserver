import express,{type Express,type Request,type Response} from 'express'
import http from 'http'
import { setupSwagger } from './app/common/config/swagger.config';
const app:Express=express()

import routers from './app/router';
const port=(process.env.PORT) ?? 5000
setupSwagger(app);


const initApp=async ():Promise<void>=>{

    app.use("/api", routers);
    app.get("/",(req:Request,res:Response)=>{
        res.send({status:"ok"})
    })
}


http.createServer(app).listen(port,()=>{
    console.log("Server is running at port",port)
})

void initApp()