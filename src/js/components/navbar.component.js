import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';
import { ActiveRoute } from './../core/active.route.service';

export class NavbarComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._userId = this._authService.userId;
        this._activeRoute = new ActiveRoute();
    }
    async beforeRender() {
        
    }
    render() {
        if (!this._authService.token) return ''; 

        return `
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">App</a>
            <ul class="navbar-nav d-flex flex-row">
                <li class="nav-item" >
                    <a class="nav-link" 
                    href="/#/users/${this._userId}" 
                    >My profile</a>
                </li>
            </ul>
            <button class="btn btn-primary logout-bth">Logout</button>
        </nav>
        `
    }
    afterRender() {
        if (!this._authService.token) return; 
        
        document.querySelector('.logout-bth').addEventListener('click', (e) => {
            this._authService.logout()
                .then(() => this._routing.navigate(`/login`));
        });
    }
}