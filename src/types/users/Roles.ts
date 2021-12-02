interface PermissionObject {
    key: Permission
}

interface Permission {
    create: boolean,
    view: boolean,
    edit: boolean,
    delete: boolean,
    list: boolean
}

interface RoleObject {
    created_at: string,
    id: number,
    name: string,
    permissions: PermissionObject,
    updated_at: string,
}

export { RoleObject }