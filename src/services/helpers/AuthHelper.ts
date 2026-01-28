import jwt, { SignOptions } from "jsonwebtoken"

export const generateJWT = (payload: any, expiresIn: string): string => {
    const option: SignOptions = {
        expiresIn: expiresIn as SignOptions['expiresIn']
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
    return token;
}