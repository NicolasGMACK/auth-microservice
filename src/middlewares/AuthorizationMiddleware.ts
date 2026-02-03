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

        const dataUser: any = await inMemoryUserRepository.getById(Number(id_user));  
        const dataPermission: any = permissionRepository.getPermissions(dataUser.user_group, domain);

        permissions.map(item => {
            if(!dataPermission.permissions.includes(item)){

                Res.status(401).json({error: 'Nao autorizado'});
            } else {
                Next();
            }

        });

        
    }
}