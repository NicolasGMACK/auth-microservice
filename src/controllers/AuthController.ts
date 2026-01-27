import { json, Request, Response } from "express";
import { executeAuthSchema } from "../schemas/AuthSchema";
import AuthService from "../services/AuthService";

const RESTRITO = {stripUnknown: true};

class AuthController {

    async execute(Req: Request, Res: Response) {

        try {

            const authService = new AuthService();

           const dadosValidados = await executeAuthSchema.validate(Req.body, RESTRITO);
           
           const result = await authService.execute(dadosValidados);
           
           Res.json(result);

        } catch(e: any) {

            Res.status(400).json({error: e.message});

        }
    }

    async refreshToken(Req: Request, Res: Response) {
        Res.json({success: true});
    }
}

export default AuthController;