interface ItemObject {
  company: string,
  created_at: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  updated_at: string
}

interface SingleItem {
  item_id: number,
  category: string,
  brand: string,
  unit: string,
  supplier: string,
  company: string,
  name: string,
  slug: string,
  sku: number,
  price: number,
  discount: number,
  inventory: number,
  expire_date: string,
  available: number,
  image: string,
  created_at: string,
  updated_at: string
}

export { ItemObject, SingleItem }