import {Component} from 'angular2/core';
import {RouteConfig, Router, Route, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {AdminPage} from './pages/AdminPage/adminPage';
import {UserService} from './services/usersService';

var applicationPath: string = '/app/pages/usersPage';


@Component({
	selector: 'my-app',
	template:`<router-outlet></router-outlet>`,
	directives:[ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
new Route({
	path: '/admin/...',
	name: 'Admin',
  		//styleUrls:[applicationPath + '/usersPage.css'],
  		component: AdminPage
})])

export class AppComponent { 
	router:Router;
	location: Location;

	 constructor(router: Router, location: Location) {
        this.router = router;
        this.location = location;
    }

}
