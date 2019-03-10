import { Http } from '../core/http.service';
import { ENV } from '../config/env';

export class UserService {
    constructor() {}

    getUser(id) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }

    getUserImages(userId) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/users/my-images/${userId}`)
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }


}