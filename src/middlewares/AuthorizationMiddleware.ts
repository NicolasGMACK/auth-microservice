import { Request, Response, NextFunction } from "express";
import PermissionRepository from "../repositories/PermissionRepository";
import UserGroupRepository from "../repositories/UserGroupRepository";
import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";

const permissionRepository = new PermissionRepository();
const userGroupRepository = new UserGroupRepository();
const inMemoryUserRepository = new InMemoryUserRepository();

export const AuthorizationMiddleware = (domain: string, permissions: string[]) => {
    return async (Req: Request, Res: Response, Next: NextFunction) => {
        const id_user = Req.body;

        const dataUser: any = await inMemoryUserRepository.getById(id_user);    

        console.log(dataUser.user_group);
        Next();
    }
}