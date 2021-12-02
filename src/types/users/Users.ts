var Permissions = require('./Permissions')

interface User {
    created_at: string,
    email: string,
    email_verified_at: string,
    id: number,
    name: string,
    role: Role,
    roleName?: string,
    role_id: number,
    updated_at: string
}

interface Role {
    created_at: string,
    id: number,
    name: string,
    permissions: Permissions[],
    updated_at: string
}

interface UserSingle {
    user_id: number,
    role: string,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    mobile: string,
    present_address: string,
    permanent_address: string,
    identity_number: number,
    city: string,
    zip: number,
    image: string,
    created_at: string,
    updated_at: string
}

export { User, Role, UserSingle }