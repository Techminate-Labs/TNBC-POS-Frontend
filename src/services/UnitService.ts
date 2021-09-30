import http from "@/http-common";

export default {
  list(url: any, token: any): Promise<any> {
    return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post(`/unitCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  edit(data: any, unitId: any, token: any): Promise<any> {
    return http.put(`/unitUpdate/${unitId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  delete(unitId: any, token: any): Promise<any> {
    return http.delete(`/unitDelete/${unitId}`, { headers: { "Authorization": `Bearer ${token}` } });
  }
}