import {Component} from 'angular2/core';
import {RouteConfig, Router, Route, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {AdminPage} from './pages/adminPage/adminPage';
import {UserService} from './services/usersService';

@Component({
	selector: 'my-app',
	template:`<router-outlet></router-outlet>`,
	directives:[ROUTER_DIRECTIVES],
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
