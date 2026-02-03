import { UserGroup } from "../models/UserGroup";

class UserGroupRepository {

    private _userGroups: UserGroup[];

    constructor() {
        this._userGroups = [
            {id: 1, name: "Administrador"},
            {id: 2, name: "Funcionário"}
        ]
    }

    getAll(){
        return this._userGroups;
    }

    getById(id: number){
        let result = {};

        this._userGroups.map((item) => {
            if(item.id === id) {
                result = item;
            }
        })
        
        return result;
    }
}

export default UserGroupRepository;