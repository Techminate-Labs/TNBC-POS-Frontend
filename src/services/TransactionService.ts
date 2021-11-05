import http from "@/http-common";

export default {

    listTransactions(token: any): Promise<any> {
        return http.get(`/graph`, { headers: { "Authorization": `Bearer ${token}` } });
    }

}
