// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)

// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';

// Prefer CoreJS over the polyfills above
import 'es6-shim/es6-shim.min';
import 'reflect-metadata/Reflect.js';
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';
