import http from "@/http-common";
import store from '@/store'

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
    return http.get("/users", token);
  }

  addUser(data: any): Promise<any> {
    return http.post("/register", data);
  }

}

export default new DataService();
