import http from "@/http-common";

export default {

    addCustomer(data: any, token: any): Promise<any> {
        return http.post(`/cartAddCustomer`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    addItem(data: any, token: any): Promise<any> {
        return http.post(`/cartItemCreate/`, data, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    },
    
    listItems(params: any, token: any): Promise<any> {
        return http.get(`/cartItemList/?${params}`, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    },

    deleteItem(item_id: any, token: any): Promise<any> {
        return http.delete(`/cartItemDelete/${item_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    updateItem(body: any, item_id: any, token: any): Promise<any> {
        return http.post(`/cartItemUpdate/${item_id}`, body, { headers: { "Authorization": `Bearer ${token}` } });
    },

    printInvoice(params: any, token: any): Promise<any> {
        return http.get(`/invoice/${params}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    async fetchExchangeRate(currency: string): Promise<any> {
        const response = fetch(`https://open.er-api.com/v6/latest/${currency}`, { mode: 'cors' })
            .then(res => res.json())
        return response
    },

}
