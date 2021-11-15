export interface InvoiceSingle {
	invoice: Invoice
	invoiceItems: Array<InvoiceItems>
}

export interface InvoiceItems {
	id: number,
	invoice_id: number,
	item_id: number,
	item_name: string,
	unit: string,
	unit_price: number,
	qty: number,
	total: number,
	created_at: string,
	updated_at: string
}

export interface Invoice {
	id: number,
	user_id: number,
	customer_id: null | number,
	invoice_number: string,
	payment_method: string,
	subTotal: number,
	discount: number,
	tax: number,
	total: number,
	date: string,
	created_at: string,
	updated_at: string
}