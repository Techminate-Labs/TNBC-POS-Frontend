import http from "@/http-common";

export default {
  list(url: any, token: any): Promise<any> {
    return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  getById(customerId: any, token: any): Promise<any> {
    return http.get(`/customerGetById/${customerId}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post(`/customerCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  update(data: any, customerId: any, token: any): Promise<any> {
    return http.put(`/customerUpdate/${customerId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  delete(customerId: any, token: any): Promise<any> {
    return http.delete(`/customerDelete/${customerId}`, { headers: { "Authorization": `Bearer ${token}` } });
  }
}