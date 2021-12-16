import http from "@/http-common";

export default {

    listTotal(token: any): Promise<any> {
        return http.get(`/countTotal`, { headers: { "Authorization": `Bearer ${token}` } });
    },
    
    salesByDate(token: any, paymentMethod: string): Promise<any> {
        return http.get(`/dateViewChart?payment_method=${paymentMethod}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    salesByDay(token: any, paymentMethod: string): Promise<any> {
        return http.get(`/dayViewChart?payment_method=${paymentMethod}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    salesByMonth(token: any, paymentMethod: string): Promise<any> {
        return http.get(`/monthSalesChart?payment_method=${paymentMethod}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

}
