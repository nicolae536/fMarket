import {Http, Headers, Request, RequestOptionsArgs, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export class FMarketApi{
	http:Http;

	constructor(http: Http) {
		this.http = http;
	}

	request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response>{
		return this.http.request(url, this.getRequestOptions(options));
	}

	get(url: string, options?: RequestOptionsArgs) : Observable<Response>{
		return this.http.get(url, this.getRequestOptions(options));
	}

	post(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>{
		return this.http.post(url, body, this.getRequestOptions(options));	
	}

	put(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>{
		return this.http.put(url, body, this.getRequestOptions(options));	
	}

	delete(url: string, options?: RequestOptionsArgs) : Observable<Response>{
		return this.http.delete(url, this.getRequestOptions(options));	
	}

	patch(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>{		
		return this.http.patch(url, body, this.getRequestOptions(options));	
	}

	head(url: string, options?: RequestOptionsArgs)  : Observable<Response>{
		return this.http.head(url, this.getRequestOptions(options));	
	}

	getRequestOptions(options): RequestOptionsArgs{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var newOptions = options ? options : {headers:function () {}};
		newOptions.headers = headers;
		return newOptions;
	}

}