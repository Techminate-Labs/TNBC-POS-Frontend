import http from "@/http-common";

export default {

    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

}
