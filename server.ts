import Express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import router from './routes';
import { object } from "yup";

dotenv.config({quiet: true});

const server = Express();

server.use(cors());
server.use(Express.urlencoded({extended: true}));
server.use(router);


server.listen (process.env.PORT);
