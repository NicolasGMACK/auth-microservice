import { Request, Response, NextFunction } from "express";

export const AuthorizationMiddleware = (domain: string, permissions: string[]) => {
    return (Req: Request, Res: Response, Next: NextFunction) => {
        console.log('authorization middleware');
        Next();
    }
}