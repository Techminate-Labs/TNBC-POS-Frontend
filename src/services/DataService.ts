import http from "@/http-common";
import store from '@/store'

let _token = store.state.bearerToken;
class DataService {
  loginUser(data: any): Promise<any> {
    return http.post("/login", data);
  }

  logoutUser(token: string): Promise<any> {
    const body = {};
    return http.post("/logout", body, { headers: { "Authorization": `Bearer ${token}` } });
  }

  forgotPassword(data: any): Promise<any> {
    return http.post("/forgot-password", data);
  }

  resetPassword(data: any): Promise<any> {
    return http.post("/reset-password", data);
  }

  listUsers(token: any): Promise<any> {
    return http.get("/users", { headers: { "Authorization": `Bearer ${token}` } });
  }

  addUser(data: any, token: any): Promise<any> {
    return http.post("/register", data, { headers: { "Authorization": `Bearer ${token}` } });
  }

  updateUser(data: any, id: number): Promise<any> {
    return http.put(`/users/${id}`, data, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  deleteUser(id: number, token: any): Promise<any> {
    return http.delete(`/users/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  }

  listUserProfile(id: number, token: any): Promise<any> {
    return http.get(`/userProfile/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  }

  addUserProfile(data: any): Promise<any> {
    return http.post('/userProfile', data, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  listRoles(token: any): Promise<any> {
    return http.get('/roles', { headers: { "Authorization": `Bearer ${token}` } });
  }

  updateRole(data: any, id: number, token: any): Promise<any> {
    return http.put(`/roles/${id}`, data, { headers: { "Authorization": `Bearer ${token}` } });
  }

  addRole(data: any): Promise<any> {
    return http.post('/roles', data, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  deleteRole(id: number): Promise<any> {
    return http.delete(`/roles/${id}`, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  requestEmailVerification(data: any, token: any): Promise<any> {
    return http.post('/email/verification-notification', data, { headers: { "Authorization": `Bearer ${token}` } });
  }

  verifyEmail(path: any): Promise<any> {
    return http.get(`${path}`, { headers: { "Authorization": `Bearer ${_token}` } });
  }
}

export default new DataService();
