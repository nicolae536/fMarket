/**
 * Created by nick_ on 6/20/2016.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FaceBookService {
    private FB;

    constructor() {
        let me=this;
        //noinspection TypeScriptUnresolvedVariable
        if (!window.fbAsyncInit) {
            console.log('define');
            //noinspection TypeScriptUnresolvedVariable
            window.fbAsyncInit = function() {
                console.log('fb init');
                //noinspection TypeScriptUnresolvedVariable
                FB.init({
                    appId: '963606340368916',
                    cookie: true,  // enable cookies to allow the server to access
                    // the session
                    xfbml: true,  // parse social plugins on this page
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

    initFB() {
        var js,
            id = 'facebook-jssdk',
            ref = document.getElementsByTagName('script')[0];

        if (document.getElementById(id)) {
            return;
        }

        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";

        ref.parentNode.insertBefore(js, ref);
        console.log('sdk load');
    }

    login(){
        let me = this;
        return Observable.create(o=>{
            //noinspection TypeScriptUnresolvedVariable
            FB.login((response)=>{
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    //noinspection TypeScriptUnresolvedVariable
                    FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            })
        })
    }

    statusChangeCallback(response){
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
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    }
}

