import { User } from "../../models/User";

class InMemoryUserRepository {

    private _users: User[];

    constructor() {
        this._users = [{
            name: "VITOR",
            email: "vitor@gmail.com",
            phone: "12996426213",
            password: "$2b$10$APP3VsO5KtJtV5W1TgLx6eessst9DuYiRbIaLLY6qpfGwANoAVjdW"
        }]
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = this._users.find(user => user.email === email);
        
        return user ?? null;
        
    }
}

export default InMemoryUserRepository;