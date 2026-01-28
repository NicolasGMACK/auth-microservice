import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { User } from "../../models/User";

export const generateJWT = (payload: any, expiresIn: string): string => {
    const option: SignOptions = {
        expiresIn: expiresIn as SignOptions['expiresIn']
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
    return token;
}

export const decodeJWT = (token: string): string | JwtPayload[keyof User] | null => {
    const payloadToken = jwt.decode(token);
    return payloadToken;
}

export const verifyJWT = (jwt_token: string): boolean => {

    try {

        jwt.verify(jwt_token, process.env.JWT_SECRET as string);

        return true;

    } catch (e: any) {
        return false;
    }
}
