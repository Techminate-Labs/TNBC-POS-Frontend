import http from "@/http-common";
import store from '@/store'

let _token = store.state.bearerToken;
class DataService {

  requestEmailVerification(data: any, token: any): Promise<any> {
    return http.post('/email/verification-notification', data, { headers: { "Authorization": `Bearer ${token}` } });
  }

  verifyEmail(path: any): Promise<any> {
    return http.get(`${path}`, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  listCategories(url: any, token: any): Promise<any> {
    return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
  }

  createCategory(data: any, token: any): Promise<any> {
    return http.post(`/categoryCreate`, data, { headers: { "Authorization": `Bearer ${token}` } });
  }

  editCategory(data: any, categoryId: any, token: any): Promise<any> {
    return http.put(`/categoryUpdate/${categoryId}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  }

}

export default new DataService();
