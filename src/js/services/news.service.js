import { Http } from '../core/http.service';
import { ENV } from '../config/env';
import { AuthService } from '../services/auth.service';
export class News {
    constructor() {
        this._authservice = new AuthService();
    }

    //последние новости
    news() {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, this._authservice.token)
                .then((response) => {
                    if (!response) return reject(response); 
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}
