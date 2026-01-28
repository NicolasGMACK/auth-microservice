import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import { AuthInterface } from "../schemas/AuthSchema";
import bcrypt from 'bcrypt';
import { generateJWT } from "./helpers/AuthHelper";

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

    async refreshToken() {

    }
}

export default AuthService;