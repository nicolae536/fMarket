/**
 * Created by NicolaeB on 5/25/2016.
 */
// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/forms';

import 'angular2-google-maps/core';

// RxJS
import 'rxjs';
import 'underscore';
import 'ng2-bootstrap';
// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
