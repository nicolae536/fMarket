System.register(['angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1;
    var FMarketApi;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            FMarketApi = (function () {
                function FMarketApi(http) {
                    this.http = http;
                }
                FMarketApi.prototype.request = function (url, options) {
                    return this.http.request(url, this.getRequestOptions(options));
                };
                FMarketApi.prototype.get = function (url, options) {
                    return this.http.get(url, this.getRequestOptions(options));
                };
                FMarketApi.prototype.post = function (url, body, options) {
                    return this.http.post(url, body, this.getRequestOptions(options));
                };
                FMarketApi.prototype.put = function (url, body, options) {
                    return this.http.put(url, body, this.getRequestOptions(options));
                };
                FMarketApi.prototype.delete = function (url, options) {
                    return this.http.delete(url, this.getRequestOptions(options));
                };
                FMarketApi.prototype.patch = function (url, body, options) {
                    return this.http.patch(url, body, this.getRequestOptions(options));
                };
                FMarketApi.prototype.head = function (url, options) {
                    return this.http.head(url, this.getRequestOptions(options));
                };
                FMarketApi.prototype.getRequestOptions = function (options) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var fmarketClientOptions = options ? options : { headers: null };
                    if (fmarketClientOptions && fmarketClientOptions.headers && (fmarketClientOptions.headers.get('Content-Type') || fmarketClientOptions.headers.get('content-type'))) {
                        return fmarketClientOptions;
                    }
                    fmarketClientOptions.headers = headers;
                    return fmarketClientOptions;
                };
                return FMarketApi;
            }());
            exports_1("FMarketApi", FMarketApi);
        }
    }
});
//# sourceMappingURL=fMarketApi.js.map