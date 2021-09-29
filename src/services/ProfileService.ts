import http from "@/http-common";

export default {
  list(id: number, token: any): Promise<any> {
    return http.get(`/userProfileView/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  },

  create(data: any, token: any): Promise<any> {
    return http.post('/userProfileCreate', data, { headers: { "Authorization": `Bearer ${token}` } });
  },
  
  update(data: any, user_id: number, token: any): Promise<any> {
    return http.post(`/userProfileUpdate/${user_id}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  },

  updatePassword(data: any, token: any): Promise<any> {
    return http.post(`/profileSettingPasswordUpdate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  }
}