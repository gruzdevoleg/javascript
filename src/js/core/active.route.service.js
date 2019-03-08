export class ActiveRoute {
    parseRequestURL() {
        const url = decodeURI(location.hash).trim().slice(1).toLowerCase() || '/';
        //console.log();
        const routes = url.split('/');
        //console.log(routes);
        return {
            resourse: routes[1],
            id: routes[2],
            url
        }
    }
    
    routerLink(link) {
        const request = this.parseRequestURL();
        //console.log(link);
        //console.log(request);
        return 'class="active"'
    }
}