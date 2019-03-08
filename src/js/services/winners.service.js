import { Http } from './../core/http.service';
import { ENV } from './../config/env';
import { AuthService } from './../services/auth.service';
export class Winners {
    
    //winners
    winners() {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=1&limit=15`)
                .then((response) => {
                    if (!response) return reject(response); 
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}
