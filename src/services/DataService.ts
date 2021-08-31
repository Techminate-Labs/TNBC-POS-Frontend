import http from "@/http-common";
import store from '@/store'

class DataService {
  loginUser(data: any): Promise<any> {
    return http.post("/login", data);
  }

  logoutUser(token: string): Promise<any> {
    const body = { };
    console.log('from DataService.ts', token)
    return http.post("/logout", body, { headers: { "Authorization": `Bearer ${token}` } });
  }

}

export default new DataService();
