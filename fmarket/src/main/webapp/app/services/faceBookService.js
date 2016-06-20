var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 6/20/2016.
 */
var core_1 = require("@angular/core");
var fMarketApi_1 = require("./fMarketApi");
var FaceBookService = (function () {
    function FaceBookService(fmarketApi) {
        this.fmarketApi = fmarketApi;
        var me = this;
        //noinspection TypeScriptUnresolvedVariable
        if (!window.fbAsyncInit) {
            console.log('define');
            //noinspection TypeScriptUnresolvedVariable
            window.fbAsyncInit = function () {
                console.log('fb init');
                //noinspection TypeScriptUnresolvedVariable
                FB.init({
                    appId: '963606340368916',
                    cookie: true,
                    // the session
                    xfbml: true,
                    version: 'v2.6' // use graph api version 2.5
                });
                //noinspection TypeScriptUnresolvedVariable
                FB.getLoginStatus(function (response) {
                    me.statusChangeCallback(response);
                });
            };
        }
        this.initFB();
    }
    FaceBookService.prototype.initFB = function () {
        var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);
        console.log('sdk load');
    };
    // login(){
    //     let me = this;
    //     return Observable.create(o=>{
    //         //noinspection TypeScriptUnresolvedVariable
    //         FB.login((response)=>{
    //             if (response.authResponse) {
    //                 console.log('Welcome!  Fetching your information.... ');
    //                 //noinspection TypeScriptUnresolvedVariable
    //                 FB.api('/me', function(response) {
    //                     console.log('Good to see you, ' + response + '.');
    //                 });
    //             } else {
    //                 console.log('User cancelled login or did not fully authorize.');
    //             }
    //         })
    //     })
    // }
    FaceBookService.prototype.login = function () {
        return this.fmarketApi.post('connect/facebook', '');
    };
    FaceBookService.prototype.statusChangeCallback = function (response) {
        debugger;
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
        else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    };
    FaceBookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], FaceBookService);
    return FaceBookService;
})();
exports.FaceBookService = FaceBookService;
//# sourceMappingURL=faceBookService.js.map