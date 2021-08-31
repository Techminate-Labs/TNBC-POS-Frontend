import http from "@/http-common";

class DataService {
  loginUser(data: any): Promise<any> {
    return http.post("/login", data);
  }

}

export default new DataService();
