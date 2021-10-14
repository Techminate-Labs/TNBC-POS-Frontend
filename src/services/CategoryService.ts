import http from "@/http-common";

export default {
    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post(`/categoryCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    edit(data: any, categoryId: any, token: any): Promise<any> {
        return http.put(`/categoryUpdate/${categoryId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    delete(categoryId: any, token: any): Promise<any> {
        return http.delete(`/categoryDelete/${categoryId}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}