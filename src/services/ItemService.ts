import http from "@/http-common";

export default {
  list(url: any, token: any): Promise<any> {
    return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post(`/itemCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  edit(data: any, itemId: any, token: any): Promise<any> {
    return http.put(`/itemUpdate/${itemId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  delete(itemId: any, token: any): Promise<any> {
    return http.delete(`/itemDelete/${itemId}`, { headers: { "Authorization": `Bearer ${token}` } });
  }
}