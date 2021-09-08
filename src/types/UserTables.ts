var Permissions = require('./Permissions')

interface UserTableColumns {
  attribute: string,
  name: string,
  subAttribute?: string
}

interface UserTableItems {
  id: number,
  name: string,
  email: string,
  role: string,
  created_at: string,
  email_verified_at: string,
  updated_at: string,
}

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

export { UserTableItems, UserTableColumns, User, Role }