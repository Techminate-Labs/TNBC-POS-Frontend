import http from "@/http-common";

export default {

    list(token: any): Promise<any> {
        return http.get(`/config`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    update(data: any, token: any): Promise<any> {
        return http.post(`/configUpdate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

}
