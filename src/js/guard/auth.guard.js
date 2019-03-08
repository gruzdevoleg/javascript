import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';

export class AuthGuard {
    constructor() {
        this._auth = new AuthService();
        this._routing = new Routing();
    }
    check() {
        if (!this._auth.userId) {
            this._routing.navigate(`/login `);
            return false;
        }

        return true;
    }
}