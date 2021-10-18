import http from "@/http-common";

export default {
    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(itemId: any, token: any): Promise<any> {
        return http.get(`/itemGetById/${itemId}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post(`/itemCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    edit(data: any, itemId: any, token: any): Promise<any> {
        return http.post(`/itemUpdate/${itemId}`, data, { headers: { "Authorization": `Bearer ${token}`, "content-type": "multipart/form-data" } });
    },

    delete(itemId: any, token: any): Promise<any> {
        return http.delete(`/itemDelete/${itemId}`, { headers: { "Authorization": `Bearer ${token}` } });
    }


}