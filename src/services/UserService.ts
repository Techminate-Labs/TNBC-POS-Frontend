import http from "@/http-common";

export default {
    login(data: any): Promise<any> {
        return http.post("/login", data);
    },

    logout(token: string): Promise<any> {
        const body = {};
        return http.post("/logout", body, { headers: { "Authorization": `Bearer ${token}` } });
    },

    forgotPassword(data: any): Promise<any> {
        return http.post("/forgot-password", data);
    },

    resetPassword(data: any): Promise<any> {
        return http.post("/reset-password", data);
    },

    list(url: any, token: any): Promise<any> {
        return http.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(user_id: number, token: any): Promise<any> {
        return http.get(`userGetById/${user_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post("/register", data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    update(data: any, id: number, token: any): Promise<any> {
        return http.put(`/userUpdate/${id}`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },
    
    delete(user_id: number, token: any): Promise<any> {
        return http.delete(`/userDelete/${user_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }
}