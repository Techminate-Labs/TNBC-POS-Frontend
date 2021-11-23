import http from "@/http-common";

export default {
    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post(`/supplierCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    update(data: any, supplierId: any, token: any): Promise<any> {
        return http.put(`/supplierUpdate/${supplierId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    delete(supplierId: any, token: any): Promise<any> {
        return http.delete(`/supplierDelete/${supplierId}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}