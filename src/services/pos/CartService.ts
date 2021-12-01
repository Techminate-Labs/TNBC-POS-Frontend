import http from "@/http-common";

export default {

    addCustomer(data: any, token: any): Promise<any> {
        return http.post(`/cartAddCustomer`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    addItem(data: any, token: any): Promise<any> {
        return http.post(`/cartItemCreate/`, data, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json", "content-type": "multipart/form-data" } });
    },
    
    listItems(params: any, token: any): Promise<any> {
        return http.get(`/cartItemList/${params}`, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });
    },

    deleteItem(item_id: any, token: any): Promise<any> {
        return http.delete(`/cartItemDelete/${item_id}`, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });
    },

    updateItem(body: any, item_id: any, token: any): Promise<any> {
        return http.post(`/cartItemUpdate/${item_id}`, body, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });
    },

    generateInvoice(params: any, token: any): Promise<any> {
        return http.get(`/invoice/${params}`, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });
    },

}
