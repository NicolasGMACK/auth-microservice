import { Permission } from "../models/Permission";

class PermissionRepository {
    
    private _permissions: Permission[];
    
    constructor() {
        this._permissions = [
            {id: 5, user_group: 1, domain: 'project', permissions: ['getAll', 'getById', 'add', 'update', 'delete']},
            {id: 9, user_group: 1, domain: 'project', permissions: ['getAll', 'getById', 'add']},
        ]
    }

    getAll(){
        return this._permissions;
    }
}

export default PermissionRepository;