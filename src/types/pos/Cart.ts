export interface Cart {
	cashier: string,
    payment_method: string,
    invoice_number: string,
    subTotal: number,
    discount: number,
    tax: number,
    total: number,
    date: string,
    cart_id: number,
    user_id: number,
    customer_id: number | null,
    cartItems: []
}

export interface CartItems {
	id: number,
	cart_id: number,
	item_id: number,
	item_name: string,
	unit: string,
	unit_price: number,
	qty: number,
	total: number
} 