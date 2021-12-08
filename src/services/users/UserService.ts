import http from "@/http-common";

export default {
    login(body: any): Promise<any> {
        return http.post("/login", body);
    },

    logout(token: string): Promise<any> {
        const body = {};
        return http.post("/logout", body, { headers: { "Authorization": `Bearer ${token}` } });
    },

    forgotPassword(body: any): Promise<any> {
        return http.post("/forgot-password", body);
    },

    resetPassword(body: any): Promise<any> {
        return http.post("/reset-password", body);
    },

    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(user_id: number, token: any): Promise<any> {
        return http.get(`userGetById/${user_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(body: any, token: any): Promise<any> {
        return http.post("/register", body, { headers: { "Authorization": `Bearer ${token}` } });
    },

    update(body: any, id: number, token: any): Promise<any> {
        return http.put(`/userUpdate/${id}`, body, { headers: { "Authorization": `Bearer ${token}` } });
    },
    
    delete(user_id: number, token: any): Promise<any> {
        return http.delete(`/userDelete/${user_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}