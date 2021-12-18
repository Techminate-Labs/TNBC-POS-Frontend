import http from "@/http-common";

export default {

    listTotal(token: any): Promise<any> {
        return http.get(`/countTotal`, { headers: { "Authorization": `Bearer ${token}` } });
    },
    
    salesBy(token: any, route: string, paymentMethod: string): Promise<any> {
        return http.get(`${route}?payment_method=${paymentMethod}`, { headers: { "Authorization": `Bearer ${token}` } });
    }

}
