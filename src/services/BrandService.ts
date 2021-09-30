import http from "@/http-common";

export default {
  list(url: any, token: any): Promise<any> {
    return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post(`/brandCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  edit(data: any, brandId: any, token: any): Promise<any> {
    return http.put(`/brandUpdate/${brandId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  delete(brandId: any, token: any): Promise<any> {
    return http.delete(`/brandDelete/${brandId}`, { headers: { "Authorization": `Bearer ${token}` } });
  }
}