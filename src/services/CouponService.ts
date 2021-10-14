import http from "@/http-common";

export default {
    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(couponId: any, token: any): Promise<any> {
        return http.get(`/couponGetById/${couponId}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post(`/couponCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    update(data: any, couponId: any, token: any): Promise<any> {
        return http.put(`/couponUpdate/${couponId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    delete(couponId: any, token: any): Promise<any> {
        return http.delete(`/couponDelete/${couponId}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}