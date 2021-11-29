import http from "@/http-common";

export default {

    listTotal(token: any): Promise<any> {
        return http.get(`/countTotal`, { headers: { "Authorization": `Bearer ${token}` } });
    }

}
