import http from "@/http-common";

export default {

    listConfigurations(token: any): Promise<any> {
        return http.get(`/config`, { headers: { "Authorization": `Bearer ${token}` } });
    }

}
