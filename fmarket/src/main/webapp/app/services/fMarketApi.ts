import {Http, Headers, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApplicationStateService} from "./applicationStateService";

@Injectable()
export class FMarketApi {
    http:Http;
    private _applicationStateService:ApplicationStateService;

    constructor(http:Http, applicationStateService:ApplicationStateService) {
        this.http = http;
        this._applicationStateService = applicationStateService;
    }

    request <T>(url:string | Request, options?:RequestOptionsArgs):Observable<T> {
        return this.http.request(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    get <T>(url:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.get(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    post <T>(url:string, body:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.post(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    put <T>(url:string, body:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.put(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    delete <T>(url:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.delete(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    patch <T>(url:string, body:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.patch(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    head <T>(url:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.head(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    }

    responseMessageHandler(response:Response){
        if(response.status === 401){
            this._applicationStateService.removeUserSession();
        }

        if(response && response.text instanceof Function && response.text().length > 0){
            return response.json();
        }
    }

    getRequestOptions(options):RequestOptionsArgs {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let fmarketClientOptions:RequestOptionsArgs = options ? options : { headers:null };

        if (fmarketClientOptions && fmarketClientOptions.headers && (fmarketClientOptions.headers.get('Content-Type') || fmarketClientOptions.headers.get('content-type'))){
            return fmarketClientOptions;
        }

        fmarketClientOptions.headers = headers;
        return fmarketClientOptions;
    }

}