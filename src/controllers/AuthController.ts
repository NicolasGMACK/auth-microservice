import { json, Request, Response } from "express";
import { executeAuthSchema, refreshTokenSchema, RefreshTokenInterface, AuthInterface } from "../schemas/AuthSchema";
import AuthService from "../services/AuthService";

const RESTRITO = {stripUnknown: true};

class AuthController {

    async execute(Req: Request, Res: Response) {

        try {

            const authService = new AuthService();

           const dadosValidados: AuthInterface = await executeAuthSchema.validate(Req.body, RESTRITO);
           
           const result = await authService.execute(dadosValidados);
           
           Res.json(result);

        } catch(e: any) {

            Res.status(400).json({error: e.message});

        }
    }

    async refreshToken(Req: Request, Res: Response) {
        try {

            const authService = new AuthService();

            const dadosValidados: RefreshTokenInterface = await refreshTokenSchema.validate(Req.body, RESTRITO);

            const resultadoRefreshToken = await authService.refreshToken(dadosValidados);

            Res.status(200).json(resultadoRefreshToken);

        } catch(e: any) {
            Res.status(400).json({error: e.message})
        }
    }

    async get(Req: Request, Res: Response) {
        Res.json({success: true});
    }
}

export default AuthController;