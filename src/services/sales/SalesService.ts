import http from "@/http-common";

export default {
    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(invoice_id: any, token: any): Promise<any> {
        return http.get(`/invoiceGetById/${invoice_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    listReports(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}