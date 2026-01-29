import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthService from "../services/AuthService";
import { decodeJWT } from "../services/helpers/AuthHelper";

export const AuthMiddleware = async(Req: Request, Res: Response, Next: NextFunction) => {
    try {
    const authService = new AuthService();
    
    const { authorization, refresh_token } = Req.headers;

    if (authorization && refresh_token) {
        const tokens = await authService.refreshToken({token: authorization, refresh_token: refresh_token as string});

        Res.set("authorization", tokens.token);
        Res.set("refresh_token", tokens.refreshToken);
        
        const decode: any = decodeJWT(tokens.token);
        Req.body = decode.id;
        Next();
        return;
    }
    throw new Error('parametros inválidos');
    } catch(e: any) {
        Res.status(400).json({error: e.message});
    }
    
}