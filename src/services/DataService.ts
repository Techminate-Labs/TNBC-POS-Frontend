import http from "@/http-common";
import store from '@/store'

let _token = store.state.bearerToken;
class DataService {
  loginUser(data: any): Promise<any> {
    return http.post("/login", data);
  }

  logoutUser(token: string): Promise<any> {
    const body = { };
    return http.post("/logout", body, { headers: { "Authorization": `Bearer ${token}` } });
  }

  forgotPassword(data: any): Promise<any> {
    return http.post("/forgot-password", data);
  }

  listUsers(token: any): Promise<any> {
    return http.get("/users", { headers: { "Authorization": `Bearer ${token}` } });
  }

  addUser(data: any): Promise<any> {
    return http.post("/register", data, { headers: { "Authorization": `Bearer ${_token}` } });
  }

  updateUser(data: any, id: number): Promise<any> {
    return http.put(`/users/${id}`, data, { headers: { "Authorization": `Bearer ${_token}` } });
  }

}

export default new DataService();
