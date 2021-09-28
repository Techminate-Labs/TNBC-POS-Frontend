import http from "@/http-common";

export default {
  list(token: any): Promise<any> {
    return http.get('/roleList', { headers: { "Authorization": `Bearer ${token}` } });
  },

  update(data: any, user_id: number, token: any): Promise<any> {
    return http.put(`/roleUpdate/${user_id}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post('/roleCreate', data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  delete(id: number, token: any): Promise<any> {
    return http.delete(`/roleDelete/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  }
}