import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import { AuthInterface, RefreshTokenInterface } from "../schemas/AuthSchema";
import bcrypt from 'bcrypt';
import { decodeJWT, generateJWT, verifyJWT } from "./helpers/AuthHelper";

class AuthService {

    async execute(dadosValidados: AuthInterface) {
        const inMemoryUserRepository = new InMemoryUserRepository();
        
        const dataUser = await inMemoryUserRepository.getByEmail(dadosValidados.email);

        console.log(await bcrypt.hash(dadosValidados.password, 10));

        if (!dataUser) {
            throw new Error("E-mail e/ou senha inválidos.");
        }

        const ifPasswordCorrect = await bcrypt.compare(dadosValidados.password, dataUser.password);
        
        if (!ifPasswordCorrect) {
            throw new Error("E-mail e/ou senha inválidos.");
        }

        dataUser.password = "Não informado por questão de segurança";

        const token = generateJWT(dataUser, process.env.JWT_EXPIRES_IN as string);
        const refreshToken = generateJWT(dataUser, process.env.JWT_REFRESH_EXPIRES_IN as string);

        return {token, refreshToken};
    }

    async refreshToken(dadosValidados: RefreshTokenInterface) {

        const verifyRefreshToken = verifyJWT(dadosValidados.refresh_token);
        
        if (!verifyRefreshToken) {
            throw new Error('refresh token inválido!');
        }

        const {id, name, email, phone, password, user_group}  = decodeJWT(dadosValidados.refresh_token);
        const payload = {id, name, email, phone, password, user_group};

        const token = generateJWT(payload, process.env.JWT_EXPIRES_IN as string);
        const refreshToken = generateJWT(payload, process.env.JWT_REFRESH_EXPIRES_IN as string);

        return {token, refreshToken};

    }
}

export default AuthService;