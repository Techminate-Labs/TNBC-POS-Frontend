import http from "@/http-common";

export default {

    listTransactions(token: any): Promise<any> {
        return http.get(`/transactionHistory`, { headers: { "Authorization": `Bearer ${token}` } });
    }

}
