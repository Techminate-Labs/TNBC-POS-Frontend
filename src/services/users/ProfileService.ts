import http from "@/http-common";

export default {
    list(id: number, token: any): Promise<any> {
        return http.get(`/userProfileView/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    getById(user_id: number, token: any): Promise<any> {
        return http.get(`userProfileGetById/${user_id}`, { headers: { "Authorization": `Bearer ${token}` } });
    },

    create(data: any, token: any): Promise<any> {
        return http.post('/userProfileCreate', data, { headers: { "Authorization": `Bearer ${token}` } });
    },
    
    update(data: any, user_id: number, token: any): Promise<any> {
        return http.post(`/userProfileUpdate/${user_id}`, data, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    },

    updatePassword(data: any, token: any): Promise<any> {
        return http.post(`/profileSettingPasswordUpdate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    },

    updatePhoto(data: any, token: any): Promise<any> {
        return http.post(`/profileSettingPhotoUpdate`, data, { headers: { "Authorization": `Bearer ${token}` } });
    }
}