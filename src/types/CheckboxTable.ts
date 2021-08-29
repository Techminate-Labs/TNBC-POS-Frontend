interface CheckboxTableItems {
  section: string,
  create: boolean,
  edit: boolean,
  delete: boolean,
  view: boolean,
  list: boolean
}


interface CheckboxTableColumns {
  name: string,
  attribute: string
}

export { CheckboxTableItems, CheckboxTableColumns }