interface RoleTableColumns {
  attribute: string,
  name: string
}

interface RoleTableItems {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
}

export { RoleTableItems, RoleTableColumns }