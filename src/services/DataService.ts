import http from "@/http-common";
import store from '@/store'

let _token = store.state.session.bearerToken;
class DataService {

    requestEmailVerification(data: any, token: any): Promise<any> {
        return http.post('/email/verification-notification', data, { headers: { "Authorization": `Bearer ${token}` } });
    }

    verifyEmail(path: any): Promise<any> {
        return http.get(`${path}`, { headers: { "Authorization": `Bearer ${_token}` } });
    }

}

export default new DataService();
