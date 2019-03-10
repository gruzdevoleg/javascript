// components
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { SignupComponent } from './components/signup.component';
import { UserComponent } from './components/user.component';
import { NewsComponent } from './components/news.component';
import { WinnersComponent } from './components/winners.component'; 
import { NavbarComponent } from './components/navbar.component';
import { PaymentComponent } from './components/payment.component';
//services
import { ActiveRoute } from './core/active.route.service';
import { AuthGuard } from './guards/auth.guard';
import { PaymentGuard } from './guards/payment.guard';
// const routes = {
//     '/': new HomeComponent(),
//     '/login': new LoginComponent(),
//     '/users/:id': new UserComponent(),
//     '**': new NotFoundComponent()
// };
const activeRoute = new ActiveRoute();
const authGuard = new AuthGuard();
const paymentGuard = new PaymentGuard();
const routes = {
    '/': {
        component: new LoginComponent(),
        //guard: new AuthGuard(),
    },

    '/signup': {
        component: new SignupComponent(),
    },

    '/login': {
        component:  new LoginComponent()
    },

    '/users/:id': {
        component: new UserComponent(),
        guard: [authGuard]
    },

    '/news': {
        component: new NewsComponent(),
        guard: [authGuard],
    },

    '/winners': {
        component: new WinnersComponent(),
        //guard: new AuthGuard(),
    },

    '/payments': {
        component: new PaymentComponent(),
        guard: [authGuard, paymentGuard]
    },

    '**': {
        component: new NotFoundComponent()
    }
};


const router = async () => {
    // Get content container and header container
    const container = document.querySelector('app-container');
    const header = null || document.querySelector('app-header');
    // Get active route
    const request = activeRoute.parseRequestURL();
    const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');
    // Get component by route
    const component = routes[url] ? routes[url]['component'] : routes['**']['component'];
    const guards = routes[url] ? routes[url]['guard'] : null;
    // Check guard
    if (guards) {
        const guardState = guards.every(function(item) {
            return item.canActivate();
        });
       if (!guardState) return;
    }

    if (header) {
        const navbarComponent = new NavbarComponent();
        header.innerHTML = navbarComponent.render();
        navbarComponent.afterRender();
    }

    await component.beforeRender();
    container.innerHTML = component.render();
    component.afterRender();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);