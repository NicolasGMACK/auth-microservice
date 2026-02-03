import { Permission } from "../models/Permission";

class PermissionRepository {
    
    private _permissions: Permission[];
    
    constructor() {
        this._permissions = [
            {id: 5, user_group: 2, domain: 'project', permissions: ['getAll', 'getById', 'add', 'update', 'delete']},
            {id: 9, user_group: 3, domain: 'project', permissions: ['getAll', 'getById', 'add']},
        ]
    }

    getAll(){
        return this._permissions;
    }

    getPermissions(user_group: number, domain: string) {
        let result = {};

        this._permissions.map((item) => {
            if (item.user_group === user_group){
                result = item;
            }
        })

        return result;
    };
}

export default PermissionRepository;