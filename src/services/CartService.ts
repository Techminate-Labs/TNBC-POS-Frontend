import http from "@/http-common";

export default {

    addCustomer(data: any, token: any): Promise<any> {
        return http.post(`/cartAddCustomer`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    addItem(data: any, token: any): Promise<any> {
        return http.post(`/cartItemCreate/`, data, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });
    },

}
