import { DataSource } from "typeorm";
import { User } from "../app/user/user.schema";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",  
  password: "root",  
  database: "75waychatdb",  
  entities: [User],
  synchronize: true,  
  logging: true,  
});
