interface UserTableColumns {
  attribute: string,
  name: string
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

export { UserTableItems, UserTableColumns }