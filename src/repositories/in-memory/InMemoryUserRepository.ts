import { User } from "../../models/User";

class InMemoryUserRepository {

    private _users: User[];

    constructor() {
        this._users = [{
            id: 1,
            name: "VITOR",
            email: "vitor@gmail.com",
            user_group: 3,
            password: "$2b$10$APP3VsO5KtJtV5W1TgLx6eessst9DuYiRbIaLLY6qpfGwANoAVjdW"
        }]
    }

    async getById(id: number) {
        let user = {};
        this._users.map((item) => {
            if (item.id === id) {
                user = item;
            }
        });

        return user;
        
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = this._users.find(user => user.email === email);
        
        return user ?? null;
        
    }
}

export default InMemoryUserRepository;