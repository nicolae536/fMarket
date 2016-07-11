// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
"use strict";
// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';
// Prefer CoreJS over the polyfills above
require('es6-shim/es6-shim.min');
require('reflect-metadata/Reflect.js');
require('zone.js/dist/zone');
// Typescript emit helpers polyfill
require('ts-helpers');
//# sourceMappingURL=polyfills.js.map